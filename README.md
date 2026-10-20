# Astar Peers Program

Public portal: https://astar-peers-program.cctksarah.chatgpt.site/

Bilingual English/Japanese static website, using the selected Astar Portal design. Includes light/dark mode, larger readable type, site-wide search, article navigation, and command copying. Content updates can be requested in Codex chat, saved to this repository, and published with Sites. MkDocs is no longer needed.

## Local development

Requires Node.js 20 or newer. Run `npm ci`, `npm run build`, `npm run check`, and `npm run preview`. Preview at http://127.0.0.1:4173.

## Updating content

- Articles: `portal/content/en/` and `portal/content/ja/`. Both languages use matching filenames.
- Home-page text and program links: `portal/content.mjs`.
- Shared templates: `scripts/build-site.mjs`; styles and browser behavior: `portal/site.css`, `portal/site.js`.
- Images: `portal/assets/images/`. Generated `dist/` is ignored and rebuilt for publication.

Update both languages together. Keep program policy, reward priority, dated measurements, author credit, and command order consistent. Season 3.1 recruitment is closed; reopening requires an explicit content change.

## Publishing

See [migration and publishing notes](MIGRATION.md). Keep the Site project ID in `.openai/hosting.json`. Use the Sites source workflow to synchronize the exact source commit and package `dist/`, push the same commit to this GitHub repository, save the packaged version, and deploy through Sites. Never store publishing credentials in files or Git.

Theme preference is stored in the visitor's browser. There are no applicant records, server database, analytics, or administration UI in this project.
