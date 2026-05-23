const STORAGE_BLOCKED_PROVIDERS = "blockedStakeProviders";
const STORAGE_BLOCK_ONLY_ON_STAKE = "blockOnlyOnStakeGames";
const STORAGE_BLOCKER_ENABLED = "stakeProviderBlockerEnabled";

const HIDDEN_CLASS = "stake-provider-blocker-hidden";
const STYLE_ID = "stake-provider-blocker-style";

let blockedProviders = [];
let blockOnlyOnStakeGames = false;
let blockerEnabled = true;
let observer = null;
let debounceTimer = null;
let isFiltering = false;

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeProviderName(text) {
  return normalizeText(text)
    .replace(/&/g, "and")
    .replace(/[^a-z0-9ąćęłńóśźż]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function injectStyle() {
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.setAttribute("data-stake-provider-blocker-ui", "true");

  style.textContent = `
    .${HIDDEN_CLASS} {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      width: 0 !important;
      height: 0 !important;
      min-width: 0 !important;
      min-height: 0 !important;
      max-width: 0 !important;
      max-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      overflow: hidden !important;
    }
  `;

  document.documentElement.appendChild(style);
}

async function loadSettings() {
  const result = await chrome.storage.sync.get([
    STORAGE_BLOCKED_PROVIDERS,
    STORAGE_BLOCK_ONLY_ON_STAKE,
    STORAGE_BLOCKER_ENABLED
  ]);

  blockedProviders = Array.isArray(result[STORAGE_BLOCKED_PROVIDERS])
    ? result[STORAGE_BLOCKED_PROVIDERS]
    : [];

  blockOnlyOnStakeGames = Boolean(result[STORAGE_BLOCK_ONLY_ON_STAKE]);

  blockerEnabled =
    typeof result[STORAGE_BLOCKER_ENABLED] === "undefined"
      ? true
      : Boolean(result[STORAGE_BLOCKER_ENABLED]);
}

function isElementVisible(element) {
  if (!element || !(element instanceof Element)) {
    return false;
  }

  const rect = element.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
}

function isInsideBlockedUiArea(element) {
  if (!element || !(element instanceof Element)) {
    return true;
  }

  if (
    element.id === STYLE_ID ||
    element.getAttribute("data-stake-provider-blocker-ui") === "true"
  ) {
    return true;
  }

  const blockedSelectors = [
    "header",
    "nav",
    "aside",
    "footer",
    "[role='navigation']",
    "[aria-label*='navigation' i]",
    "[aria-label*='menu' i]",
    "[class*='sidebar' i]",
    "[class*='side-bar' i]",
    "[class*='sidenav' i]",
    "[class*='side-nav' i]",
    "[class*='drawer' i]",
    "[class*='modal' i]",
    "[class*='popup' i]",
    "[class*='popover' i]",
    "[class*='dropdown' i]",
    "[class*='chat' i]",
    "[class*='toast' i]",
    "[class*='notification' i]"
  ];

  for (const selector of blockedSelectors) {
    if (element.closest(selector)) {
      return true;
    }
  }

  const rect = element.getBoundingClientRect();

  const isFarLeftSidebar =
    rect.left < 260 &&
    rect.width < 260 &&
    rect.height > 30;

  if (isFarLeftSidebar) {
    return true;
  }

  const isRightChat =
    rect.left > window.innerWidth * 0.72 &&
    rect.width > 240;

  if (isRightChat) {
    return true;
  }

  return false;
}

function isInRealGameGridArea(element) {
  if (!element || !(element instanceof Element)) {
    return false;
  }

  const rect = element.getBoundingClientRect();

  if (rect.left < 260) {
    return false;
  }

  if (rect.top < 170) {
    return false;
  }

  if (rect.left > window.innerWidth * 0.78) {
    return false;
  }

  return true;
}

function getMainContentRoot() {
  const candidates = [
    "main",
    "[role='main']",
    "[class*='main' i]",
    "[class*='content' i]",
    "[class*='casino' i]"
  ];

  for (const selector of candidates) {
    const elements = Array.from(document.querySelectorAll(selector));

    const good = elements.find((element) => {
      if (!isElementVisible(element)) {
        return false;
      }

      if (isInsideBlockedUiArea(element)) {
        return false;
      }

      const rect = element.getBoundingClientRect();

      return rect.width > 500 && rect.height > 250;
    });

    if (good) {
      return good;
    }
  }

  return document.body;
}

function getGameLinkInside(element) {
  if (!element || !(element instanceof Element)) {
    return null;
  }

  if (
    element.tagName === "A" &&
    (
      element.href.includes("/casino/games/") ||
      element.href.includes("/casino/game/")
    )
  ) {
    return element;
  }

  return element.querySelector?.(
    "a[href*='/casino/games/'], a[href*='/casino/game/']"
  ) || null;
}

function getElementText(element) {
  if (!element || !(element instanceof Element)) {
    return "";
  }

  return normalizeText(element.innerText || element.textContent || "");
}

function hasPlayerCountText(element) {
  const text = getElementText(element);

  return (
    /\d+\s*w\s*grze/i.test(text) ||
    /\d+\s*playing/i.test(text) ||
    text.includes("w grze")
  );
}

function isProbablyWholePageSection(element) {
  if (!element || !(element instanceof Element)) {
    return true;
  }

  if (element === document.body || element === document.documentElement) {
    return true;
  }

  if (isInsideBlockedUiArea(element)) {
    return true;
  }

  const rect = element.getBoundingClientRect();
  const text = getElementText(element);

  if (rect.width > window.innerWidth * 0.7 && rect.height > window.innerHeight * 0.5) {
    return true;
  }

  if (text.length > 1800) {
    return true;
  }

  return false;
}

function looksLikeGameTile(element) {
  if (!element || !(element instanceof Element)) {
    return false;
  }

  if (isInsideBlockedUiArea(element)) {
    return false;
  }

  if (!isInRealGameGridArea(element)) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const text = getElementText(element);

  const hasGameLink = Boolean(getGameLinkInside(element));
  const hasVisual = Boolean(element.querySelector?.("img, picture, svg"));

  const goodSize =
    rect.width >= 80 &&
    rect.height >= 80 &&
    rect.width <= 440 &&
    rect.height <= 580;

  const goodText = text.length <= 700;

  return goodSize && goodText && (hasGameLink || hasVisual);
}

function findOuterGameTile(startElement) {
  let current = startElement;
  let best = null;
  let bestWithPlayerCount = null;

  for (let depth = 0; depth < 14; depth++) {
    if (!current || !(current instanceof Element)) {
      break;
    }

    if (isProbablyWholePageSection(current)) {
      break;
    }

    if (!isInRealGameGridArea(current)) {
      current = current.parentElement;
      continue;
    }

    if (looksLikeGameTile(current)) {
      best = current;

      if (hasPlayerCountText(current)) {
        bestWithPlayerCount = current;
      }
    }

    current = current.parentElement;
  }

  return bestWithPlayerCount || best || null;
}

function getCombinedSearchText(tile) {
  const parts = [];

  parts.push(tile.innerText || "");
  parts.push(tile.textContent || "");
  parts.push(tile.getAttribute("aria-label") || "");
  parts.push(tile.getAttribute("title") || "");
  parts.push(tile.getAttribute("alt") || "");
  parts.push(tile.getAttribute("href") || "");

  const link = getGameLinkInside(tile);

  if (link) {
    parts.push(link.href || "");
    parts.push(link.getAttribute("aria-label") || "");
    parts.push(link.getAttribute("title") || "");
  }

  tile.querySelectorAll?.("img, svg, use, picture, source").forEach((node) => {
    parts.push(node.getAttribute("alt") || "");
    parts.push(node.getAttribute("title") || "");
    parts.push(node.getAttribute("aria-label") || "");
    parts.push(node.getAttribute("src") || "");
    parts.push(node.getAttribute("href") || "");
    parts.push(node.getAttribute("xlink:href") || "");
    parts.push(node.getAttribute("class") || "");
  });

  return normalizeProviderName(parts.join(" "));
}

function tileMatchesBlockedProvider(tile) {
  const combinedText = getCombinedSearchText(tile);
  const compactText = combinedText.replace(/\s+/g, "");

  for (const provider of blockedProviders) {
    const normalizedProvider = normalizeProviderName(provider);

    if (!normalizedProvider) {
      continue;
    }

    if (combinedText.includes(normalizedProvider)) {
      return provider;
    }

    const compactProvider = normalizedProvider.replace(/\s+/g, "");

    if (compactProvider && compactText.includes(compactProvider)) {
      return provider;
    }
  }

  return null;
}

function tileHasOnlyOnStakeBadge(tile) {
  if (!tile || !(tile instanceof Element)) {
    return false;
  }

  const searchText = getCombinedSearchText(tile);

  if (
    searchText.includes("only on stake") ||
    searchText.includes("stake exclusive") ||
    searchText.includes("stake originals") ||
    searchText.includes("stake original")
  ) {
    return true;
  }

  const tileRect = tile.getBoundingClientRect();

  const candidates = Array.from(tile.querySelectorAll("*")).filter((element) => {
    if (!isElementVisible(element)) {
      return false;
    }

    const rect = element.getBoundingClientRect();

    if (rect.width < 12 || rect.height < 12) {
      return false;
    }

    if (rect.width > 52 || rect.height > 52) {
      return false;
    }

    const relativeLeft = rect.left - tileRect.left;
    const relativeTop = rect.top - tileRect.top;

    const isTopLeft =
      relativeLeft >= -6 &&
      relativeLeft <= 48 &&
      relativeTop >= -6 &&
      relativeTop <= 48;

    if (!isTopLeft) {
      return false;
    }

    const elementText = normalizeText(element.innerText || element.textContent || "");
    const elementAttrs = normalizeText([
      element.getAttribute("aria-label") || "",
      element.getAttribute("title") || "",
      element.getAttribute("alt") || "",
      element.getAttribute("src") || "",
      element.getAttribute("class") || ""
    ].join(" "));

    const style = window.getComputedStyle(element);
    const radius = parseFloat(style.borderRadius || "0");

    const looksRound =
      radius >= 8 ||
      style.borderRadius.includes("%") ||
      Math.abs(rect.width - rect.height) <= 8;

    const mentionsStake =
      elementText === "s" ||
      elementText.includes("stake") ||
      elementAttrs.includes("stake") ||
      elementAttrs.includes("badge") ||
      elementAttrs.includes("logo");

    return looksRound || mentionsStake;
  });

  return candidates.length > 0;
}

function shouldHideTile(tile) {
  if (!blockerEnabled) {
    return false;
  }

  if (!tile || !(tile instanceof Element)) {
    return false;
  }

  if (isInsideBlockedUiArea(tile)) {
    return false;
  }

  if (!isInRealGameGridArea(tile)) {
    return false;
  }

  if (tileMatchesBlockedProvider(tile)) {
    return true;
  }

  if (blockOnlyOnStakeGames && tileHasOnlyOnStakeBadge(tile)) {
    return true;
  }

  return false;
}

function hideTile(tile) {
  if (!tile || !(tile instanceof Element)) {
    return false;
  }

  if (
    tile === document.body ||
    tile === document.documentElement ||
    isProbablyWholePageSection(tile) ||
    isInsideBlockedUiArea(tile) ||
    !isInRealGameGridArea(tile)
  ) {
    return false;
  }

  tile.classList.add(HIDDEN_CLASS);
  tile.setAttribute("data-stake-provider-blocker-hidden", "true");

  return true;
}

function unhidePreviouslyHiddenTiles() {
  document.querySelectorAll(`.${HIDDEN_CLASS}`).forEach((element) => {
    element.classList.remove(HIDDEN_CLASS);
    element.removeAttribute("data-stake-provider-blocker-hidden");
  });
}

function disableBlockerNow() {
  blockerEnabled = false;

  clearTimeout(debounceTimer);
  debounceTimer = null;

  if (observer) {
    observer.disconnect();
    observer = null;
  }

  unhidePreviouslyHiddenTiles();
}

function enableBlockerNow() {
  blockerEnabled = true;

  unhidePreviouslyHiddenTiles();
  filterVisiblePage();
  startObserver();
}

function getCandidateElementsFromRoot(root) {
  if (!root || !(root instanceof Element)) {
    return [];
  }

  const selectors = [
    "a[href*='/casino/games/']",
    "a[href*='/casino/game/']",
    "[data-testid*='game' i]",
    "[data-test*='game' i]",
    "[class*='game' i]",
    "[class*='card' i]",
    "article",
    "li"
  ];

  const found = new Set();

  for (const selector of selectors) {
    if (root.matches?.(selector)) {
      found.add(root);
    }

    root.querySelectorAll?.(selector).forEach((element) => {
      found.add(element);
    });
  }

  return Array.from(found);
}

function filterRoot(root) {
  if (!blockerEnabled) {
    unhidePreviouslyHiddenTiles();
    return;
  }

  if (!blockedProviders.length && !blockOnlyOnStakeGames) {
    return;
  }

  const candidates = getCandidateElementsFromRoot(root);
  const checkedTiles = new Set();

  for (const element of candidates) {
    if (!isElementVisible(element)) {
      continue;
    }

    if (isInsideBlockedUiArea(element)) {
      continue;
    }

    if (!isInRealGameGridArea(element)) {
      continue;
    }

    const tile = findOuterGameTile(element);

    if (!tile || checkedTiles.has(tile)) {
      continue;
    }

    checkedTiles.add(tile);

    if (shouldHideTile(tile)) {
      hideTile(tile);
    }
  }
}

function filterVisiblePage() {
  if (!blockerEnabled) {
    unhidePreviouslyHiddenTiles();
    return;
  }

  if (isFiltering) {
    return;
  }

  isFiltering = true;

  try {
    const root = getMainContentRoot();
    filterRoot(root);
  } finally {
    isFiltering = false;
  }
}

function scheduleFilter(root = null) {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    if (!blockerEnabled) {
      unhidePreviouslyHiddenTiles();
      return;
    }

    if (root && root instanceof Element) {
      filterRoot(root);
      return;
    }

    filterVisiblePage();
  }, 180);
}

function mutationBelongsToExtension(mutation) {
  const target = mutation.target;

  if (target instanceof Element) {
    if (
      target.id === STYLE_ID ||
      target.getAttribute("data-stake-provider-blocker-ui") === "true" ||
      target.getAttribute("data-stake-provider-blocker-hidden") === "true"
    ) {
      return true;
    }
  }

  for (const node of mutation.addedNodes) {
    if (node instanceof Element) {
      if (
        node.id === STYLE_ID ||
        node.getAttribute("data-stake-provider-blocker-ui") === "true"
      ) {
        return true;
      }
    }
  }

  return false;
}

function startObserver() {
  if (observer) {
    observer.disconnect();
  }

  if (!blockerEnabled) {
    return;
  }

  const root = getMainContentRoot();

  if (!root) {
    return;
  }

  observer = new MutationObserver((mutations) => {
    if (!blockerEnabled) {
      unhidePreviouslyHiddenTiles();
      return;
    }

    if (!blockedProviders.length && !blockOnlyOnStakeGames) {
      return;
    }

    const rootsToFilter = new Set();

    for (const mutation of mutations) {
      if (mutationBelongsToExtension(mutation)) {
        continue;
      }

      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (!isInsideBlockedUiArea(node)) {
              rootsToFilter.add(node);
            }
          }
        });
      }
    }

    if (rootsToFilter.size === 0) {
      scheduleFilter();
      return;
    }

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (!blockerEnabled) {
        unhidePreviouslyHiddenTiles();
        return;
      }

      for (const item of rootsToFilter) {
        filterRoot(item);
      }
    }, 180);
  });

  observer.observe(root, {
    childList: true,
    subtree: true
  });
}

function restartFilteringAfterSettingsChange() {
  clearTimeout(debounceTimer);
  debounceTimer = null;

  unhidePreviouslyHiddenTiles();

  if (!blockerEnabled) {
    disableBlockerNow();
    return;
  }

  enableBlockerNow();
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") {
    return;
  }

  const providerChanged = Boolean(changes[STORAGE_BLOCKED_PROVIDERS]);
  const onlyOnStakeChanged = Boolean(changes[STORAGE_BLOCK_ONLY_ON_STAKE]);
  const enabledChanged = Boolean(changes[STORAGE_BLOCKER_ENABLED]);

  if (!providerChanged && !onlyOnStakeChanged && !enabledChanged) {
    return;
  }

  if (providerChanged) {
    blockedProviders = Array.isArray(changes[STORAGE_BLOCKED_PROVIDERS].newValue)
      ? changes[STORAGE_BLOCKED_PROVIDERS].newValue
      : [];
  }

  if (onlyOnStakeChanged) {
    blockOnlyOnStakeGames = Boolean(changes[STORAGE_BLOCK_ONLY_ON_STAKE].newValue);
  }

  if (enabledChanged) {
    blockerEnabled =
      typeof changes[STORAGE_BLOCKER_ENABLED].newValue === "undefined"
        ? true
        : Boolean(changes[STORAGE_BLOCKER_ENABLED].newValue);
  }

  if (!blockerEnabled) {
    disableBlockerNow();
    return;
  }

  restartFilteringAfterSettingsChange();
});

chrome.runtime.onMessage.addListener((message) => {
  if (message && message.type === "STAKE_PROVIDER_BLOCKER_UPDATED") {
    loadSettings().then(() => {
      if (!blockerEnabled) {
        disableBlockerNow();
        return;
      }

      restartFilteringAfterSettingsChange();
    });
  }
});

async function init() {
  injectStyle();
  await loadSettings();

  if (!blockerEnabled) {
    disableBlockerNow();
  } else {
    enableBlockerNow();
  }

  window.addEventListener(
    "scroll",
    () => {
      if (blockerEnabled) {
        scheduleFilter();
      }
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      if (blockerEnabled) {
        scheduleFilter();
      }
    },
    { passive: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}