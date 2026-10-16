# Ashwin Iyer · earlier work archive

[Explore the archive](https://ashwin-iyer1.github.io/ReactPortfolio/) · [Current portfolio](https://ashwiniyer.com/)

This repository is the earlier React portfolio, preserved as a distinct project archive. The current professional portfolio remains at **ashwiniyer.com**. The new directory retains all twelve entries and original references from `src/projects.json`, with searchable categories, alphabetical/original order, shareable filters and project details, a reading list and Markdown export.

Historical descriptions are available inside each detail panel, clearly separated from present context. Student-year and unverified award statements from the original pages are not presented as current biography. Team projects retain team attribution; linked organizations and external sites are not claimed as solely authored. The two robotics entries link to the reviewed engineering archive/code lab; HomeReady Pro links to the educational scenario studio.

## Development

Node 22.12+: `npm ci`, `npm run dev`. `npm test` checks search/filter composition, safe URL parsing, unique project identities and reading-list output. `npx playwright install chromium` then `npm run test:ui` checks the production build on desktop and 360px mobile, reading-list export/reload, project deep links/focus, source context, empty states, no external requests/storage and legacy paths. `npm run build` produces portable `dist/` assets.

The new entry is `src/archive.jsx`. Original components, images, project JSON and public templates are retained as historical sources; they are not imported by the new entry or copied wholesale into the deployment. [The pinned original revision](https://github.com/Ashwin-Iyer1/ReactPortfolio/tree/fc438a6f3beab77c683c3d3fb6b8a3421d339deb) records the prior design. The build removes unused CRA, Next.js, Three.js and analytics runtime dependencies. No analytics, third-party embeds, or network API calls run in the archive.

Filters and selected public project IDs live in the URL, not local storage. A shared link therefore includes those selections. The export contains only selected public project names, context and reference links. External links remain independent services and may change.

## Publication

GitHub Pages serves the existing `gh-pages` branch at `https://ashwin-iyer1.github.io/ReactPortfolio/`. Authenticated Pages configuration and the deployed branch have no custom domain. The historical `public/CNAME` remains in source and is deliberately excluded from the new build, preserving the live configuration. CI verifies source pushes and uploads the build artifact; the reviewed production build is committed to the existing publication branch. `404.html` routes old About/Projects paths to their archive sections under either a root or project prefix.
