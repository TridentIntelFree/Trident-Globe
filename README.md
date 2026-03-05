# WORLDVIEW — 4D OSINT Command Center

A browser-based geospatial intelligence dashboard that reconstructs events in 4D (3D globe + time) using open-source intelligence (OSINT) data layers. Built as a single HTML file — no build tools, no backend, no accounts required except an optional Grok API key for AI analysis.

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
- **Grok AI analyst panel** — Ask situational questions with context-aware responses
- **PIN-protected** — 4-digit access code on launch
- **Mobile responsive** — Collapsible panels, touch controls

## Demo Scenario

The included dataset reconstructs “Operation Epic Fury” — a simulated geopolitical escalation timeline showing pre-strike satellite buildup, GPS jamming, strikes, flight diversions, airspace closures, retaliation arcs, and maritime shutdown in the Persian Gulf region.

## Quick Start

1. Clone the repo
1. Open `worldview-4d-command-center.html` in a browser (or deploy to GitHub Pages)
1. Enter PIN: `0330`
1. (Optional) Click ⚙ to add your [Grok API key](https://console.x.ai/) for AI analysis

### GitHub Pages Deployment

1. Go to repo **Settings → Pages**
1. Set source to `main` branch, root folder
1. Your site will be live at `https://yourusername.github.io/worldview/`

## Configuration

All settings are in the ⚙ panel (top-right gear icon):

|Setting     |Default    |Notes                                                |
|------------|-----------|-----------------------------------------------------|
|Grok API Key|—          |Get one at [console.x.ai](https://console.x.ai/)     |
|Model       |grok-3-mini|Cheapest option. Switch to grok-3 for deeper analysis|
|Max Tokens  |256        |Lower = cheaper. 150–300 is a good range             |

API keys are stored in-browser only and sent directly to xAI’s API. Nothing touches a server you don’t control.

## Token Cost Management

The app is designed to minimize Grok API usage:

- Uses `grok-3-mini` by default (lowest cost per token)
- System prompts are compact (~150 tokens of context)
- Max response length is capped and adjustable
- Quick-query buttons avoid long typed prompts
- Running token counter displayed in the AI panel
- AI only fires when you explicitly ask — no background calls

## Tech Stack

- **Three.js** (r128) — 3D globe rendering, loaded from CDN
- **Vanilla JS** — No framework, no build step
- **Grok API** — xAI chat completions endpoint (optional)
- **Google Fonts** — IBM Plex Mono + Orbitron

Zero dependencies to install. Single HTML file.

## Roadmap

- [ ] Connect real OSINT data feeds (OpenSky for flights, Space-Track for satellites, AIS for maritime)
- [ ] Add more coastline/border detail to the globe
- [ ] NOTAMs / airspace data from FAA API
- [ ] GPSJam.org integration for real jamming data
- [ ] Event editor to create custom scenario timelines
- [ ] Export timeline snapshots as images

## License

MIT
