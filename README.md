# ShitBlocker — Stake Provider Blocker

ShitBlocker is a lightweight Chrome extension that lets you hide selected game providers on Stake.com.

It can also hide games marked as **Only on Stake**, so you can clean up the casino game list and remove providers or categories you do not want to see.

## Features

- Hide selected game providers on Stake.com
- Hide **Only on Stake** games
- Enable or disable all blocking with one main switch
- Keep your blocked provider list saved between sessions
- Search providers inside the popup
- Polish and English interface using Chrome auto language detection
- Lightweight Manifest V3 extension
- Works locally in your browser only

## What it does

The extension modifies only the way Stake.com is displayed in your own browser.

When a provider is blocked, matching game tiles are hidden from the game grid. The extension does not modify your Stake account, your balance, your bets, or any server-side data.

## Installation

### 1. Download the project

2. Open Chrome Extensions

Open this page in Google Chrome:

chrome://extensions/
3. Enable Developer Mode

Turn on Developer mode in the top-right corner.

4. Load the extension

Click:

Load unpacked

Then select the folder containing the extension files.

The folder should contain files like:

manifest.json
popup.html
popup.js
styles.css
content.js
_locales/
5. Open Stake.com

Go to:

https://stake.com/

Click the extension icon and choose the providers you want to block.

Folder structure
shitblocker/
├── manifest.json
├── popup.html
├── popup.js
├── styles.css
├── content.js
└── _locales/
    ├── en/
    │   └── messages.json
    └── pl/
        └── messages.json
How to use

Open the extension popup.

You can:

turn blocking on or off using the main switch,
block or unblock individual providers,
search for providers,
block all providers,
unblock all providers,
Enable or disable the Only on Stake filter.

Your settings are saved automatically using Chrome storage.

Saved settings

The extension stores your settings locally using Chrome extension storage.

Saved settings include:

blockedStakeProviders
blockOnlyOnStakeGames
stakeProviderBlockerEnabled

This means your blocked provider list should stay saved after:

refreshing Stake.com,
closing Chrome,
restarting your computer,
disabling and enabling the blocker switch.

If you remove the extension completely, Chrome may delete the saved settings.

Supported languages

The extension currently supports:

English
Polish

Chrome automatically chooses the interface language based on your browser language.

If the browser language is not Polish, English is used as the default fallback.

Disclaimer

This extension is not affiliated with, endorsed by, sponsored by, or officially connected to Stake.com.

Stake.com and all related names, logos, and trademarks belong to their respective owners.

This extension only changes the local display of the website in your browser. It does not interact with Stake.com servers in any official or privileged way.

Privacy

ShitBlocker does not collect, sell, or send your data anywhere.

The extension only uses Chrome storage to save your local blocking settings.

It does not track you, does not use analytics, and does not send data to external servers.

Permissions

The extension uses the following permissions:

storage

Used to save your blocked providers and extension settings.

tabs

Used to notify open Stake.com tabs when settings are changed from the pop-up.

Host permissions for Stake.com
https://stake.com/*
https://*.stake.com/*

Used so the extension can run on Stake.com and hide matching game tiles.

Notes

Stake.com is a dynamic website, so the page may load new game tiles while you scroll.

The extension watches for newly loaded content and hides matching games when they appear.


License

MIT License

You are free to use, modify, and share this project.
