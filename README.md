# acc_game

Double-entry accounting practice (Next.js). Develop with Node locally; use Docker only if you want a local production-like container.

## Prerequisites

- **Local dev / deploy:** Node.js 20+ and npm (`npm install`).
- **Optional local Docker:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose v2). Not used for Vercel.

## Deploy (Vercel or any Node host)

Use the normal Next.js build. **Do not** enable “Docker” as the build strategy on Vercel—this repo’s `Dockerfile` is for **local** use only.

On [Vercel](https://vercel.com): import the repo and use the default Next.js preset (`npm run build` / `vercel build`). `vercel.json` sets `"framework": "nextjs"` so the platform uses the Next builder, not the Dockerfile.

Elsewhere:

```bash
npm install
npm run build
npm start
```

## Run locally (development)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker (local only)

For a production-style run on your machine (e.g. workshops), from this directory:

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000). Stop with `Ctrl+C` or `docker compose down`.

The image build sets `NEXT_STANDALONE=1` so `next.config.ts` emits **standalone** output (small runtime image). That flag is **not** set on Vercel (`VERCEL=1`), so cloud deploys use the default Next output.

### Troubleshooting (Docker)

- **Port 3000 already in use:** change the host port in `docker-compose.yml` (e.g. `"3001:3000"`) and open `http://localhost:3001`.
- **After changing `package.json`:** rebuild with `docker compose build --no-cache` or `docker compose up --build`.

## Production build (local, without Docker)

```bash
npm install
npm run build
npm start
```
