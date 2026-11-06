<div align="center">
	<img src="public/logo.svg" alt="twilight" style="height: 120px; transform: translateX(-10px);"/>

## **Twilight by Ecaf**	

</div>

--- 

## What is Twilight?

**Twilight** is a 2-week hackathon I hosted in my school.

This website is the platform used during the event by the participants to submit their projects and by organizers to track all the important information.

---

## Why I built it?

I developed the platform from the ground up so participants had one place to submit work, and organizers could stop juggling spreadsheets and chat threads. Designed to be fast, simple, and reliable for the event.

---

## Prerequisites

- Node.js 18+ or Bun
- A Neon account for the database, auth, and storage
- The [backend](https://github.com/gev-hobosyan/twilight.ecaf.backend) running locally or deployed

---

## Tech Stack

| Layer | Technology |
|----------|----------|
| Frontend | Next.js, TypeScript, TailwindCSS |
| [Backend](https://github.com/gev-hobosyan/twilight.ecaf.backend) | Rust, Axum |
| Database | [Neon Lakebase](https://neon.com/lakebase), [SeaORM](https://www.sea-ql.org/SeaORM/) |
| Auth | [Neon BetterAuth](https://neon.com/auth) |
| File Storage | [Neon Storage](https://neon.com/object-storage) |

---

## Features

- **PDF generation**: A pdf containing all the projects and participants, ready to print and use during the event
- **Telegram bot**: A ticket system implemented using a telegram bot
- **Voting system**: Real time voting system

---

## Getting started

First install all the dependencies

```bash
bun install
# or
npm install
```

Make a copy of `.env.example` and name it `.env`. Replace the variables accordingly.

- `BACKEND_BASE_URL`: This is the backend url. It's required to create `NEON_BACKEND_BASE_URL`
- `ADMIN_API_KEY`: The admin key used to access admin endpoints.
- `NEXT_PUBLIC_WS_URL`: This is the backend url using ws protocol.

The other variables are default neon variables you'll get while setting it up.

#### Starting a development server

```bash
bun dev
# or
npm run dev
```

The website will be accessible on `http://localhost:3000/`

#### Building the website

```bash
bun build
# or
npm run build
```
