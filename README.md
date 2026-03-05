# WORLDVIEW — 4D OSINT Command Center

A browser-based geospatial intelligence dashboard that reconstructs events in 4D (3D globe + time) using open-source intelligence (OSINT) data layers. Single HTML file, no build tools, no backend. Grok AI analysis runs through a free Cloudflare Worker proxy so your API key never touches the browser.

Inspired by [Bilawal Sidhu’s WorldView demo](https://youtu.be/0p8o7AeHDzg).

## Features

- **Interactive 3D globe** — Three.js with drag-to-rotate, scroll-to-zoom, touch support
- **Timeline playback** — Scrub through events with play/pause and speed controls (0.5×–4×)
- **6 toggleable data layers:**
  - Target sites (nuclear facilities, military bases)
  - Satellite orbital tracks with targeting beams
  - Flight paths with diversion indicators (ADS-B style)
  - GPS jamming zones (pulsing red overlays)
  - Maritime vessel tracking with status (active/fleeing/dark/seized)
  - Cascading airspace closures
- **Asset search** — Query satellites, flights, vessels, or locations by name
- **Grok AI analyst** — Context-aware intelligence analysis via secure Cloudflare Worker proxy
- **PIN-protected** — 4-digit access code on launch
- **Mobile responsive** — Collapsible panels, touch controls

## Architecture

```
Browser (GitHub Pages)          Cloudflare Worker            xAI API
┌──────────────────┐     POST  ┌─────────────────┐   POST   ┌─────────┐
│   index.html     │ ────────► │   worker.js     │ ────────► │ Grok    │
│   (no API keys)  │ ◄──────── │ + GROKGLOBE key │ ◄──────── │ API     │
└──────────────────┘   JSON    └─────────────────┘   JSON    └─────────┘
```

Your API key lives **only** in the Cloudflare Worker as an encrypted secret. The browser never sees it.

## Setup Guide

### Step 1: Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `worldview`)
1. Upload `index.html` and `README.md` to the repo
1. Go to **Settings → Pages → Source**: set to `main` branch, `/ (root)`
1. Your site will be live at `https://yourusername.github.io/worldview/`

### Step 2: Create the Cloudflare Worker

1. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) (free)
1. Go to **Workers & Pages → Create → Create Worker**
1. Name it something like `worldview-grok`
1. Click **Edit Code**, delete the default, paste the contents of `worker.js`
1. Click **Deploy**

### Step 3: Add your Grok API key as a secret

1. In the Cloudflare dashboard, go to your worker
1. Click **Settings → Variables and Secrets**
1. Under **Secrets**, click **Add**
1. Name: `GROKGLOBE`
1. Value: your xAI API key (starts with `xai-...`)
1. Click **Save and Deploy**

### Step 4: Connect the app to the worker

1. Copy your worker URL (shown at the top of the worker page, e.g. `https://worldview-grok.your-subdomain.workers.dev`)
1. Open your WorldView site
1. Enter PIN: `0330`
1. Click ⚙ (top-right gear)
1. Paste the worker URL
1. Click **SAVE**

That’s it. Grok AI is now working securely.

### (Optional) Lock down CORS

In `worker.js`, replace the `Access-Control-Allow-Origin` line:

```js
// Change this:
'Access-Control-Allow-Origin': '*',

// To this (your actual GitHub Pages URL):
'Access-Control-Allow-Origin': 'https://yourusername.github.io',
```

This ensures only your site can use the worker.

## Files

|File        |Purpose                                               |Where it goes                       |
|------------|------------------------------------------------------|------------------------------------|
|`index.html`|The full app — globe, timeline, layers, AI panel      |GitHub repo (GitHub Pages serves it)|
|`worker.js` |Cloudflare Worker proxy — holds your Grok key securely|Cloudflare Workers dashboard        |
|`README.md` |This file                                             |GitHub repo                         |

## Token Cost Management

- Uses `grok-3-mini` by default (lowest cost per token)
- System prompts are compact (~150 tokens of context)
- Max response length is capped and adjustable (default 256)
- Quick-query buttons avoid long typed prompts
- Running token counter in the AI panel
- AI only fires when you explicitly ask — no background calls

## Tech Stack

- **Three.js** (r128) — 3D globe rendering, CDN
- **Vanilla JS** — No framework, no build step
- **Cloudflare Workers** — Free serverless proxy (100k requests/day free tier)
- **xAI Grok API** — AI analysis backend
- **Google Fonts** — IBM Plex Mono + Orbitron

## Roadmap

- [ ] Connect real OSINT data feeds (OpenSky, Space-Track, AIS, GPSJam)
- [ ] Richer coastline/border geometry
- [ ] NOTAMs / airspace data from FAA API
- [ ] Custom scenario editor
- [ ] Export timeline snapshots

## License

MIT
