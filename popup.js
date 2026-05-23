const PROVIDERS = [
  "Stake",
  "Stake Engine",
  "Pragmatic Play",
  "Hacksaw Gaming",
  "Evolution",
  "Nolimit City",
  "Twist",
  "Massive Studios",
  "Paperclip Gaming",
  "Titan Gaming",
  "GG Gaming",
  "Valkyrie",
  "BGaming",
  "Play'n GO",
  "Pocket Play",
  "Games Global",
  "Uppercut Gaming",
  "Spribe",
  "3 Oaks Gaming",
  "Black Coffee Studios",
  "Pocket Games Soft",
  "Terminal Games",
  "SideQuest Originals",
  "Colorful Play",
  "Correct Interactive",
  "Mirror Image Gaming",
  "Backseat Gaming",
  "Degen Lab",
  "Novomatic",
  "Endorphina",
  "Relax Gaming",
  "Penguin King",
  "Galaxsys",
  "Sexy Rabbit",
  "Shady Lady",
  "Belatra",
  "Far Away Gaming",
  "Push Gaming",
  "True Labs",
  "Clawbuster",
  "InOut",
  "Gamzix",
  "EvoPlay",
  "GolosGames",
  "Peter & Sons",
  "Creative Cay",
  "Minty Fresh",
  "EGT Digital",
  "AvatarUX",
  "NetEnt",
  "Playzia",
  "Onlyplay",
  "Slotmill",
  "OneTouch",
  "1x2 Gaming",
  "Animotion",
  "SmartSoft",
  "Tronga Gaming",
  "Amusnet",
  "Playnetic",
  "Wicked Games",
  "Big Time Gaming",
  "Touch Royale",
  "Madlab",
  "VoltEnt",
  "Fat Panda",
  "Thunderkick",
  "Gold Leaf Studios",
  "Red Tiger",
  "Kaya",
  "Shift",
  "Edge Labs",
  "Booming Games",
  "Reload Gaming",
  "High Five Studios",
  "Gamomat",
  "Microgaming",
  "Schnulu Games",
  "Virtual Gold Studios",
  "Rainfall Gaming",
  "Fastplay",
  "Bolly Games",
  "Fantasma Games",
  "Scatter Kings",
  "Quickspin",
  "Popiplay",
  "TopSpin",
  "Havana",
  "ELK Games",
  "Dynamo Interactive",
  "Just Slots",
  "Spinomenal",
  "Disco Koala",
  "Laser Push",
  "Oryx Gaming",
  "Sky Gaming",
  "Donut Gaming",
  "Platipus",
  "GameArt",
  "BluePrint Gaming",
  "Big Ducking Wins",
  "ZeroEdge Studios",
  "Vault Gaming",
  "100 Lakes",
  "Rogue",
  "SlotGPT",
  "Barbara Bang",
  "Incredible Gaming",
  "Gaming Corps",
  "PopOK",
  "Solidicon",
  "Mancala Gaming",
  "Print Studios",
  "Apparat",
  "Bullshark Games",
  "BitPunch",
  "Expanse Studios",
  "Skywind Group",
  "Alpha Male Gaming",
  "Mascot Gaming",
  "Gentry Games",
  "Spade Studio",
  "Sunflower Gaming",
  "Max Win Gaming",
  "Slotwave Gaming",
  "Fugue Trash",
  "Octoplay",
  "Zillion",
  "OxEdge",
  "Pixel Panic",
  "Spinova",
  "Sakura Studios",
  "Alpha Bets",
  "OG Gaming",
  "Paradice Gaming",
  "NoZap Labs",
  "Drip Drop",
  "2By2 Gaming",
  "Fusebox Gaming",
  "One Hand",
  "Daddy Gaming",
  "Gliz Studio",
  "GD Enterprises",
  "AVA Studio",
  "Smile Majesty",
  "Dragon Gaming",
  "Evil Eye",
  "Multiburst",
  "Knockout Labs",
  "Redshift Interactive",
  "Bread",
  "Iron Panda",
  "Enigma Types",
  "Big Bad Radish",
  "Bitter Better",
  "Karma Games",
  "Hive Gaming",
  "Rockit Studio",
  "Cloud Frog Labs",
  "Nebula Reelworks",
  "Quick Deal",
  "Reel Rush Gaming",
  "JoJo Studio",
  "Surge Studios",
  "Jackpot Gaming",
  "A Team Gaming",
  "Cartel Gaming",
  "Banana Labs",
  "Happy Duck",
  "Magical Entertainment",
  "Cascade",
  "Venture Studios",
  "Goose Gaming",
  "AxisFrame Gaming",
  "Kouple",
  "FreshPlay",
  "Spit Gaming",
  "Scarsoft",
  "Bedbugs",
  "Obsidian",
  "Twig Gaming",
  "Monster Make",
  "FunFun Gaming",
  "Baba",
  "Mega Mine Studio",
  "Bijummy Gaming",
  "Black Magic Studios",
  "Wynolab",
  "Tank Gaming",
  "Fasm Games",
  "Phew Studio",
  "Instant Games",
  "Krispy Games",
  "Darkbyte Fantasy",
  "Gold Chest Games",
  "1789 Studios",
  "Pulse Gaming",
  "Atomic Gaming",
  "Foxy",
  "OnlySpins Studios",
  "Titandyte Studios",
  "Naughty Reels",
  "Rathole Reels",
  "Generous Gaming",
  "Ferocious Gaming",
  "3D Gaming",
  "Kaizen",
  "Giro Games",
  "Ludix",
  "ACM Gaming",
  "Whitelion Gaming",
  "WIDEHOLE",
  "xLab",
  "Bricked Up Studio",
  "Oven Baked Games Studio",
  "QuantumSpin",
  "JeanClaude",
  "Diamond Wheel Limited",
  "ABEE Gaming",
  "Monk Games",
  "CKR Gaming",
  "Party House",
  "JPL",
  "Highrolla",
  "Flashwings",
  "Juicebox",
  "Astral Gaming",
  "Dopamine City",
  "Ninja Lynx",
  "Backroads Gaming",
  "Zetlo Studio",
  "Yump Studios",
  "Spinanta",
  "Lever",
  "Reach Studio",
  "Hungry Games",
  "Zelikman",
  "Nano Gaming",
  "Flowrode",
  "Axiom Gaming",
  "ScratchM8",
  "Ghost Gaming",
  "Pinch",
  "NowNow Gaming",
  "Retsyle Studios",
  "Trusty Gaming",
  "Mount Olympus",
  "Sneaky Slots",
  "AFKGames",
  "KA Gaming",
  "NetGaming",
  "Outlaw Play",
  "Jinx Gaming",
  "Ace Roll",
  "Foot Gaming",
  "LuckyBird Studio",
  "Monstrums",
  "Pineapple Pay",
  "AK Gaming",
  "Rubber Duck Gaming",
  "Blazeso Games",
  "Degent Studios",
  "Dopamine Studios",
  "Flux Gaming",
  "Moonshine",
  "Gumble",
  "Plebeans",
  "Play'n Chill",
  "SpinForge Play",
  "Twin Ace",
  "Angry Duck Studios",
  "Wild Slab",
  "NoName Gaming",
  "Almost Normal Games",
  "Gemini",
  "Stor Studios",
  "777 Outworld Games",
  "Brainrot Sauce",
  "SlimeLabs",
  "PawJoy",
  "Legacy Gaming",
  "Limasa",
  "Loody Games",
  "Yosip Gaming",
  "Two Cakes Gaming",
  "Silver Play",
  "Hungry Labs",
  "Anvilreel Studio",
  "The Button",
  "Three Star",
  "Indexperience",
  "Originals Games",
  "Gnome",
  "Cartoon Nations",
  "One Click Gaming",
  "Astrix",
  "Skeet",
  "Reel Matrix",
  "DAGI Gaming",
  "Candy Labs",
  "Vanta",
  "Ludex",
  "Caciks",
  "Luxe Slots",
  "Velocity",
  "High Rollers",
  "Botanica",
  "Sunnie Gaming",
  "Dark Entertainment",
  "Toki",
  "DGEN"
];

const STORAGE_BLOCKED_PROVIDERS = "blockedStakeProviders";
const STORAGE_BLOCK_ONLY_ON_STAKE = "blockOnlyOnStakeGames";
const STORAGE_BLOCKER_ENABLED = "stakeProviderBlockerEnabled";

const providersList = document.getElementById("providersList");
const selectAllBtn = document.getElementById("selectAllBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const onlyOnStakeToggle = document.getElementById("onlyOnStakeToggle");
const blockerEnabledToggle = document.getElementById("blockerEnabledToggle");
const providerSearch = document.getElementById("providerSearch");

function t(key) {
  return chrome.i18n.getMessage(key) || key;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const message = t(key);

    if (message) {
      element.textContent = message;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const message = t(key);

    if (message) {
      element.setAttribute("placeholder", message);
    }
  });

  document.documentElement.lang = chrome.i18n.getUILanguage().startsWith("pl")
    ? "pl"
    : "en";
}

function normalizeSearch(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9ąćęłńóśźż\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getUniqueProviders() {
  return Array.from(new Set(PROVIDERS))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

async function getBlockedProviders() {
  const result = await chrome.storage.sync.get(STORAGE_BLOCKED_PROVIDERS);

  return Array.isArray(result[STORAGE_BLOCKED_PROVIDERS])
    ? result[STORAGE_BLOCKED_PROVIDERS]
    : [];
}

async function setBlockedProviders(providers) {
  await chrome.storage.sync.set({
    [STORAGE_BLOCKED_PROVIDERS]: providers
  });

  notifyStakeTabs();
}

async function getBlockOnlyOnStake() {
  const result = await chrome.storage.sync.get(STORAGE_BLOCK_ONLY_ON_STAKE);
  return Boolean(result[STORAGE_BLOCK_ONLY_ON_STAKE]);
}

async function setBlockOnlyOnStake(value) {
  await chrome.storage.sync.set({
    [STORAGE_BLOCK_ONLY_ON_STAKE]: Boolean(value)
  });

  notifyStakeTabs();
}

async function getBlockerEnabled() {
  const result = await chrome.storage.sync.get(STORAGE_BLOCKER_ENABLED);

  if (typeof result[STORAGE_BLOCKER_ENABLED] === "undefined") {
    return true;
  }

  return Boolean(result[STORAGE_BLOCKER_ENABLED]);
}

async function setBlockerEnabled(value) {
  await chrome.storage.sync.set({
    [STORAGE_BLOCKER_ENABLED]: Boolean(value)
  });

  notifyStakeTabs();
}

async function notifyStakeTabs() {
  const tabs = await chrome.tabs.query({
    url: [
      "https://stake.com/*",
      "https://*.stake.com/*"
    ]
  });

  for (const tab of tabs) {
    if (!tab.id) continue;

    chrome.tabs.sendMessage(tab.id, {
      type: "STAKE_PROVIDER_BLOCKER_UPDATED"
    }).catch(() => {
      // Tab może jeszcze nie mieć aktywnego content scriptu.
    });
  }
}

function getFilteredProviders() {
  const query = normalizeSearch(providerSearch.value);
  const providers = getUniqueProviders();

  if (!query) {
    return providers;
  }

  return providers.filter((provider) => {
    return normalizeSearch(provider).includes(query);
  });
}

function createProviderRow(provider, blockedProviders) {
  const row = document.createElement("div");
  row.className = "provider-row";

  const name = document.createElement("span");
  name.className = "provider-name";
  name.textContent = provider;

  const label = document.createElement("label");
  label.className = "switch";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = blockedProviders.includes(provider);

  const slider = document.createElement("span");
  slider.className = "slider";

  input.addEventListener("change", async () => {
    const currentBlocked = await getBlockedProviders();

    let updatedBlocked;

    if (input.checked) {
      updatedBlocked = Array.from(new Set([...currentBlocked, provider]));
    } else {
      updatedBlocked = currentBlocked.filter((item) => item !== provider);
    }

    await setBlockedProviders(updatedBlocked);
  });

  label.appendChild(input);
  label.appendChild(slider);

  row.appendChild(name);
  row.appendChild(label);

  return row;
}

async function renderProviders() {
  const blockedProviders = await getBlockedProviders();
  const blockOnlyOnStake = await getBlockOnlyOnStake();
  const blockerEnabled = await getBlockerEnabled();
  const filteredProviders = getFilteredProviders();

  providersList.innerHTML = "";

  onlyOnStakeToggle.checked = blockOnlyOnStake;
  blockerEnabledToggle.checked = blockerEnabled;

  if (!filteredProviders.length) {
    const empty = document.createElement("div");
    empty.className = "no-results";
    empty.textContent = t("noResults");
    providersList.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const provider of filteredProviders) {
    fragment.appendChild(createProviderRow(provider, blockedProviders));
  }

  providersList.appendChild(fragment);
}

blockerEnabledToggle.addEventListener("change", async () => {
  await setBlockerEnabled(blockerEnabledToggle.checked);
});

onlyOnStakeToggle.addEventListener("change", async () => {
  await setBlockOnlyOnStake(onlyOnStakeToggle.checked);
});

providerSearch.addEventListener("input", () => {
  renderProviders();
});

selectAllBtn.addEventListener("click", async () => {
  await setBlockedProviders(getUniqueProviders());
  await renderProviders();
});

clearAllBtn.addEventListener("click", async () => {
  await setBlockedProviders([]);
  await setBlockOnlyOnStake(false);
  await renderProviders();
});

applyI18n();
renderProviders();