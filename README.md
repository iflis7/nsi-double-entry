# acc_game

Double-entry accounting practice (Next.js). Run it locally with Node or in Docker without installing Node on the host.

## Prerequisites

- **Local dev:** Node.js 20+ and npm (install dependencies with `npm install`).
- **Docker:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose v2).

## Run with Docker (recommended for workshops)

From this directory:

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000). Stop with `Ctrl+C` or:

```bash
docker compose down
```

### Troubleshooting

- **Port 3000 already in use:** change the host port in `docker-compose.yml` (e.g. `"3001:3000"`) and open `http://localhost:3001`.
- **After changing `package.json`:** rebuild with `docker compose build --no-cache` or `docker compose up --build`.

The image uses Next.js **standalone** output (`output: "standalone"` in `next.config.ts`) so the runtime image stays small.

## Run locally (development)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build (local, without Docker)

```bash
npm install
npm run build
npm start
```

## Deploy

This app works on [Vercel](https://vercel.com) with the default Next.js settings, or any host that can run the Docker image built from the included `Dockerfile`.
