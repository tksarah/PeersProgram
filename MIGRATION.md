# Sites migration — design review stage

The original MkDocs sources and generated `site/` remain intact until the user selects a design and the complete replacement is verified. The work is on `sites/design-preview`; do not merge or delete the old site as part of the design review.

## Current preview

- Private owner-only Sites project, configured in `.openai/hosting.json`.
- Five different home-page compositions, with English and Japanese home, reward, and setup pages (30 pages).
- Root review gallery switches design, language, page, and a 390 px mobile frame. It does not record a final selection.
- Search covers the three preview pages. Operating rules and maintenance links explicitly open the original documentation. Discord, Dashboard, and Telemetry remain external services.
- Season 3.1 is closed (August 31, 2026, 23:59 UTC). Do not restore the application button without an explicit recruitment update.
- No applicant CSV, application records, analytics, live node metrics, or private files are included.

## Source and asset migration map

| Source | Final destination / treatment | Preview status |
| --- | --- | --- |
| `docs/index.md` | New portal home; replace repetitive index lists with task-based entrances | Five bilingual variants |
| `docs/readme/program.md` | Program overview, objectives, priority regions, season milestones | Condensed home sections; full text pending design selection |
| `docs/readme/join.md` | Participation page combined with application information | Closed status on home; full text pending |
| `docs/readme/requirements.md` | Dedicated hardware/skills reference, linked from participation | Hardware highlights and setup page; full reference pending |
| `docs/readme/operations.md` | Operator rules, Identity registration, recovery and monthly checklist | Personal checklist and link to original; full text pending |
| `docs/readme/rewards.md` | Rewards page; preserve condition order, amounts, EMA30, timing and funding links | Full bilingual article, all five designs |
| `docs/readme/updates.md` | Updates and dated season archive | Latest season note; historical image pending |
| `docs/build/setup.md` | Setup guide; retain official, Docker and Compose links, Dagga credit | Full bilingual article, all five designs; added read-only `df -h` example |
| `docs/build/tips.md` | Maintenance article; preserve disk migration sequence, commands, examples and cautions | Link to original; full article pending |
| `docs/build/tech_faq.md` | FAQ resource entry linking to original article, author Sequaja | Pending |
| `docs/community/application.md` | Merge into participation; keep deadline history, remove active application CTA | Closed status; no form link in preview |
| `docs/community/discord.md` | Community section with Builder Role instructions, Discord link and screenshots | Text and link included; screenshots pending |
| `docs/community/peers.md` | Peers listing, dates, regions, node and identity fields; external Dashboard | Six source node entries, names/regions/Identity included; join dates pending |
| `docs/resources/links.md` | Resources grouped into technical articles and previous proposals | Full links and author credits pending |

| Existing image | Treatment |
| --- | --- |
| `docs/assets/images/top.jpg` | Decorative existing network illustration in Global Network and Community Journal; not live telemetry |
| `docs/assets/images/machines.png` | Setup article with bilingual alt text |
| `docs/assets/images/2023-2025.png` | Preserve in final historical updates; pending |
| `docs/assets/images/role.png`, `channel.png` | Preserve in final Discord guidance; pending |
| `docs/assets/images/map_202601.png` | Keep source during review; dated recruitment-region illustration, not a live participation map |
| `docs/assets/images/topimage.png`, README attachment | Retain source during review; overlapping hero assets need no second publication |

## Build and local review

Requires Node.js; no dependency installation. Run `npm run build`, `npm run check`, then `npm run preview`. Local URL is `http://127.0.0.1:4173`.

Source content lives in `portal/content.mjs`, common templates in `scripts/build-preview.mjs`, presentation in `portal/site.css`, gallery in `portal/review.*`. Generated `dist/` is ignored and rebuilt before publishing.

## Chat-based maintenance and publishing

1. Receive the requested content change in chat and check the latest GitHub branch.
2. Update English and Japanese together; do not alter policy, dates, author credits or commands without source evidence or the user's instruction.
3. Build, validate relevant behavior, and commit. GitHub `origin` remains `tksarah/PeersProgram`; Sites has its separate publishing source endpoint.
4. Use the installed Sites source workflow with a short-lived credential via hidden stdin only. The workflow commits, synchronizes source, and packages the verified static output. Never save credentials to files or Git.
5. Push the identical commit to the GitHub branch, and deploy the packaged Sites version. Preserve owner-only access throughout design review.
6. After the design is chosen, complete all mapped pages, remove review-only controls/routes, and publish publicly at the Sites URL. Only after successful migration, retain a Git tag for the old version and remove MkDocs files and old generated output in a dedicated commit. The existing domain is not changed.
