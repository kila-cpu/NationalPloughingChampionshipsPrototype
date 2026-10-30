# National Ploughing Championships 2027 — Prototype

Clickable prototype of the NPC event app and digital platform, prepared by DMC Consultancy.

- `index.html` — homepage to pick a dashboard
- `app.html` — visitor mobile app wireframes (with the in-app exhibitor portal)
- `exhibitor.html` — exhibitor portal (Kilbride Tractors, Stand 268)
- `admin.html` — NPA admin dashboard

The exhibitor portal, app and admin share demo data through `npc-link.js` (browser localStorage), so changes in one show up in the others when opened in the same browser.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000.

## Deploy on Railway

Create a Railway project from this GitHub repo. Railway detects Node, runs `npm install` and `npm start`, and serves the site on the port it provides. Generate a public domain under the service's Settings → Networking.
