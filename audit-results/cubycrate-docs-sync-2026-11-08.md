# CubyCrate website synchronization audit

Date: 2026-11-08
Application source: local `cubycrate` checkout, read-only
Website baseline: `origin/main` at `a6cf25a1c41fad2adbf376e7bb8bcc489e03aecd`

Remote release evidence: GitHub Releases API listed `v0.0.1-alpha.2` as published prerelease and GitHub Tags API listed `v0.0.1-alpha.2` and `v0.0.1-alpha.1`. GitHub's public package page showed tags `alpha` and `v0.0.1-alpha.2`, last published about eight hours before this check. `docker manifest inspect` resolved `ghcr.io/septian-padli/cubycrate:v0.0.1-alpha.2` and `:alpha`, each with `linux/amd64` and `linux/arm64`. `:latest` did not resolve. GitHub package-version API and GHCR tags endpoint returned HTTP 401 without credentials. No digest is included here because manifest evidence was not recorded as a pinned digest.

## Findings and changes

| Priority | Application evidence | Website target | Observed discrepancy | Correction |
| --- | --- | --- | --- | --- |
| P0 | `cubycrate/compose.yaml:3-4,7-25`; `cubycrate/README.md:61-81`; `cubycrate/.github/workflows/release.yml:127-145` | `src/content/docs/docs/getting-started/installation.mdx` | Existing guide used old package and `:latest`, legacy service/volume, and an outdated Compose contract. Application Compose defaults to `cubycrate:local`. | Guide now downloads official Compose and exports `CUBYCRATE_IMAGE=ghcr.io/septian-padli/cubycrate` and exact published `CUBYCRATE_VERSION=v0.0.1-alpha.2`; documents `alpha` as moving and disallows alpha `latest`. |
| P0 | `cubycrate/docs/backup-restore.md:25,41-75,91-158`; `cubycrate/README.md:100-104` | `src/content/docs/docs/administrator-guide/backup-restore.mdx` | Existing guide proposed tar of live Docker volume, `sqlite3` snapshot with a binary not supplied by the image, restore over existing data, and old paths. | Replaced with the product runbook's cold full-volume archive command and validation; warns that database-only backup is incomplete, external mounts/S3 need separate backups, and restore requires isolated new volume. |
| P1 | `cubycrate/README.md:5,30-38`; `cubycrate/docs/architecture.md:33-69`; `cubycrate/docs/prd.md:103-109,134-143` | `src/content/docs/docs/index.mdx`, `src/content/docs/docs/user-guide/file-management.mdx`, `src/content/docs/docs/user-guide/sharing.mdx` | Website overclaimed feature details, misnamed database, blurred quota and physical capacity, and described excessive sharing behavior. | Rewrote claims to verified workspaces, permission distinctions, storage model, and broad supported workflows; removed speculative thresholds, exhaustive formats, unsupported limits, and timing. |
| P1 | `cubycrate/docs/architecture.md:42-60`; `cubycrate/compose.yaml:3-25`; `cubycrate/Dockerfile:39-54` | `src/content/docs/docs/getting-started/configuration.mdx` | Old environment table and proxy examples made unsupported settings/requirements claims and referred to obsolete identifiers. | Replaced with variables in the implementation/Compose contract, trust boundary for proxy headers, health endpoints and restrained Caddy/Nginx examples. |
| P1 | `cubycrate/docs/release-notes-v0.0.1-alpha.2.md:26-33`; `cubycrate/docs/backup-restore.md:97` | Installation and backup/restore guides | Clean-break policy and preservation of historical data were absent from the install flow. | Explicitly says historical `v0.0.1-alpha.1` data cannot upgrade in place; preserve old volumes and do not point CubyCrate at them. |
| P1 | Product repository `septian-padli/cubycrate`; website `src/config.ts:1-5`, `astro.config.mjs:60-65`, `src/pages/index.astro:57` | Landing page CTAs, footer and docs GitHub link, SoftwareApplication license URL | Active product links pointed to old repository. | Updated shared links, Starlight social link, and structured-data license URL to current product repo; installation CTA points to the published guide. |
| P2 | Product source paths above | `src/content/docs/docs/troubleshooting/index.mdx` | Troubleshooting commands used old Compose service and database names, asserted implementation-specific timing, and gave outdated recovery steps. | Replaced with safe status/log/probe checks and verified distinctions among setup state, volume state, capacity, proxy limits and storage availability. |

## Verified contract notes

- Product Compose: service `cubycrate`; image expression `${CUBYCRATE_IMAGE:-cubycrate}:${CUBYCRATE_VERSION:-local}`; host port `${CUBYCRATE_PORT:-8383}` to `8383`; named volume `${CUBYCRATE_VOLUME_NAME:-cubycrate_data}` at `/app/data`; healthcheck `GET /health`.
- Application config: data root `/app/data` in the container; SQLite `db/cubycrate.db`; generated JWT secret persists under `secrets`; `COOKIE_SECURE`, `TRUST_PROXY`, `ALLOWED_ORIGINS`, `CUBYCRATE_MASTER_KEY`, `CUBYCRATE_MASTER_KEY_FILE`, cleanup variables exist. CORS wildcard is rejected in production. Compose only sets `ENV=production` and `PORT=8383` by default.
- Routes: `cubycrate/apps/backend/cmd/server/main.go:201-205,223-240` registers `/health`, `/api/health`, setup/auth and storage routes. Product architecture docs identify `/api/health` as readiness and distinguish node availability from capacity.
- Storage: `cubycrate/docs/architecture.md:60-69` documents local/S3 storage, encrypted S3 credentials, node capacity separate from user quota, and cleanup dry-run defaults.
- Backup: database-only admin download is not full recovery. Full data includes app volume, but secondary disks, S3 objects and externally supplied keys need independent backup. Product runbook warns never restore over existing production volume.

## External limitations

- GHCR anonymous registry APIs returned `401`; package page and Docker manifest inspection provided positive tag evidence.
- Live image tag and release status are verified, but the package API's complete version history was unavailable anonymously.
- No image digest is documented as a pinned installation contract.
