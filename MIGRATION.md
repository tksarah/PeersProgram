# Sites migration and publishing

## Selected experience

Design 01 (Astar Portal), with light and dark palettes. The initial palette follows the device preference; a manual choice persists in browser storage and across article/language changes. Regular body text is 20 px on desktop and 18 px on mobile, with larger navigation, tables, buttons and captions. Reduced-motion preferences are respected.

The production portal is public at https://astar-peers-program.cctksarah.chatgpt.site/ . Root opens English; `/ja/` is Japanese. The existing `peers.sun-t-sarah.work` domain is not reconfigured. No old-host content links are needed by the new site. Dashboard, Telemetry, Discord, official documentation and community articles remain external services.

## Content migration map

All article bodies now live in `portal/content/en/` and `portal/content/ja/`. The selected home page uses shared text from `portal/content.mjs`. The original 14 pages have been consolidated into home plus 11 articles per language.

| Original MkDocs source | New route (prefix `/en/` or `/ja/`) |
| --- | --- |
| `docs/index.md` | Home |
| `docs/readme/program.md` | `program/` |
| `docs/readme/join.md`, `docs/community/application.md` | `join/`; Season 3.1 is closed, dated deadline retained, no active application link |
| `docs/readme/requirements.md` | `requirements/` |
| `docs/readme/operations.md` | `operations/` |
| `docs/readme/rewards.md` | `rewards/`; preserve 0%, 30%, 0%, 100%, 50% condition priority, EMA30, funding and timing |
| `docs/readme/updates.md` | `updates/`; recruitment closure and original historical image |
| `docs/build/setup.md` | `setup/`; official, Docker and Compose links, Dagga credit and dated storage note |
| `docs/build/tips.md` | `maintenance/`; original commands and example outputs in both languages, in order |
| `docs/build/tech_faq.md` | `guides/`; original FAQ link and Sequaja credit |
| `docs/community/peers.md`, `docs/community/discord.md` | `community/`; all six node entries with join dates and Identity, Dashboard credit, Builder Role and Discord screenshots |
| `docs/resources/links.md` | `resources/`; technical articles, authors and previous funding proposals |

`portal/migration-links.json` records the 21 original external references (excluding the closed application form) for automated coverage checks. Shared old path names and the previously shared design-review routes redirect to the chosen portal. Preview-only frames and design controls are removed.

The machines illustration, 2023–2025 historical record, Builder Role screenshot and channel screenshot are retained in `portal/assets/images/`. Overlapping decorative map/hero assets are recoverable from Git history. Applicant CSVs and local applicant pages were never imported.

## Validation

`npm run check` validates internal links/anchors, language counterpart routes, all 12 search entries per language, closed recruitment, reward priorities, byte-equivalent maintenance code/output blocks, preserved external references, theme controls, base font sizes, and AA contrast for key text/surface pairs. Use browser QA for palette switching/persistence, menus, search, tables, copy buttons, keyboard access and narrow layouts.

Shell code is displayed as in the original document. Copy buttons omit the original leading `# ` prompt marker so the copied command is usable; no command is executed by the site.

## Chat-based updates and publication

1. Receive the requested change in chat and inspect the latest GitHub state.
2. Edit English and Japanese together, preserving policy and source credits unless an explicit update is requested.
3. Build with `npm run build`, validate with `npm run check`, and check the affected browser behavior.
4. Obtain a short-lived credential for the existing Site ID in `.openai/hosting.json`; pass it only through hidden stdin to the installed Sites source workflow. Use its verified source commit and packaged archive. Do not write credentials to disk, source, logs or browser code.
5. Push that same commit to GitHub, save the Sites version with the archive, and deploy it. Preserve the public audience on updates.
6. Report the verified deployment URL. Keep the last successful version available if validation/publication fails.

GitHub `origin` remains `tksarah/PeersProgram`. Sites has a separate source synchronization endpoint; it is not a replacement for the GitHub repository. The built archive contains the configured `dist/` assets, not local private files.

## Legacy recovery

Tag `mkdocs-before-sites-migration-2026-10-20` points to the original MkDocs commit `44794cfb214001780c6263bc2fa95e3039b2b2d6`. Following successful publication and anonymous access verification, the old `docs/`, generated `site/`, `mkdocs.yml`, design-comparison code, and one-time importer were removed. The tag and complete Git history remain available for recovery.
