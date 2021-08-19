# Supa up

## Description

A demo project using Vite.js, Vue 3 and Supabase. Is a site status check

## Features
[x] Add Multiple Sites
[x] Public status pages
[x] Run background site checks

Roadmap
[] Delete and edit pages and sites
[] Send notifications via email
[] Prune accounts and sites daily in the demo version (for performance reasons in demo)
[] Activate creation of status and pages (24 hours) in demo 

## Demo
[supaup](https://supa-updown.web.app/status/805cd35a-4b92-406f-9ec7-a442632188dc)

## Prerequisites

| Prerequisite                                          | Version |
| ------------------------------------------------------| ------- |
| [Supabase Account](https://app.supabase.io/)                                           |    --   |
| [Node.js](http://nodejs.org)                          | `~ ^12.20`  |
| npm (comes with Node) or yarn (used)                  | `~ ^6.14.8`  |

### SQL Schema
// TODO

## Easy deploy on netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jesusantguerrero/supa-updown)

Clicking this button will clone the repo to your GitHub account and instantly deploy to Netlify. You will need to have the [Netlify CLI](https://cli.netlify.com/) installed, and a `.env.local` file in  `frontend/` with the following:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Run Locally

```shell
node -v
```

### Cloning the repo

```bash
  git clone https://github.com/jesusantguerrero/supa-updown.git
```

Go to the project directory

```bash
  cd supa-updown
```

Install dependencies

```bash
  npm setup
```

Start the server

```bash
  npm run dev
```

Running background site-checks

```bash
  npm run background
```

