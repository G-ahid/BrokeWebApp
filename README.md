
# Zero-Budget Web App Deployment Plan

This document describes a **fully free, constraint-driven deployment architecture** for a web application, designed to work **without router access, public IPs, or paid domains**.

The system separates the frontend and backend, using static hosting and a tunneled API, with automation to keep everything in sync.

---

## Overview

**Goal:**  
Host a full-stack web application with:
- A public frontend
- A privately hosted backend (behind NAT / university network)
- No paid services
- Minimal manual redeploy steps

**Key idea:**  
Decouple frontend and backend, and dynamically update the frontend with the backend’s public tunnel URL.

---

## Architecture Summary

- **Frontend:** Static website hosted on GitHub Pages
- **Backend:** API server (FastAPI/Flask) running locally
- **Ingress:** Cloudflare Tunnel (outbound-only, NAT-safe)
- **Glue:** Automation script + GitHub API

```

User Browser
|
v
GitHub Pages (Static Frontend)
|
v
Dynamic API URL (api.txt / api.json)
|
v
Cloudflare Tunnel
|
v
Local Backend Server

```

---

## Step-by-Step Plan

### 1. Frontend Refactor (Static-Only)

- Remove server-side rendering (e.g. Jinja templates).
- All communication with the backend happens via JavaScript (`fetch`).
- The frontend becomes **purely static** (HTML, CSS, JS).

This allows the frontend to be hosted on GitHub Pages for free.

---

### 2. Backend as a Pure API

- Remove HTML serving from the backend.
- Backend exposes only JSON APIs (e.g. `/login`, `/users`, `/health`).
- Optionally migrate from Flask to **FastAPI** for:
  - Cleaner API structure
  - Auto-generated docs
  - Async support

---

### 3. Dynamic API Endpoint Configuration

- The frontend does **not hardcode** the backend URL.
- Instead, it loads the API endpoint at runtime from a file such as:
  - `api.txt`
  - or `api.json`

Example:
```

[https://random-name.trycloudflare.com](https://random-name.trycloudflare.com)

```

This allows the backend URL to change without rebuilding the frontend.

---

### 4. Frontend Deployment (GitHub Pages)

- The static frontend is deployed to GitHub Pages:
```

[https://username.github.io/project](https://username.github.io/project)

```

- GitHub Pages serves the app globally, over HTTPS, for free.
- The frontend reads the API endpoint dynamically on load.

---

### 5. Backend Hosting + Tunnel

- The backend runs locally (home machine or laptop).
- Cloudflare Tunnel exposes the backend to the public internet:
  - No port forwarding
  - No router access
  - Works behind university NAT/firewalls

Result:
```

Localhost → Cloudflare Tunnel → Public HTTPS URL

```

---

### 6. Automation Script (DIY CI/CD)

A server-side script performs the following:

1. Pull latest backend code from GitHub
2. Restart the backend server
3. Start Cloudflare Tunnel
4. Capture the generated public tunnel URL
5. Use the GitHub API to update `api.txt` in the frontend repo
6. GitHub Pages updates automatically

This makes deployment **repeatable and automated**.

---

## Why This Works

- Avoids all inbound network restrictions
- Requires zero paid services
- Separates concerns cleanly (frontend vs backend)
- Allows rapid iteration and redeployment
- Mimics real-world DevOps patterns with minimal tooling

---

## Tradeoffs

**Pros**
- Fully free
- Works on hostile networks
- Educational and flexible
- Real-world architecture principles

**Cons**
- Backend URL changes on restart
- Slight propagation delay via GitHub Pages
- Not designed for high traffic or production scale

---

## Conclusion

This setup is intentionally overengineered for a small project, but demonstrates:
- Infrastructure awareness
- Deployment automation
- Service discovery
- Real DevOps thinking under constraints

When resources are limited, creativity becomes architecture.
