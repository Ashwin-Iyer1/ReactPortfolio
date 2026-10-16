import { writeFile, copyFile } from "node:fs/promises";
// Live Pages has no custom domain; do not copy historical public/CNAME.
await copyFile("public/favicon.ico", "dist/favicon.ico");
await writeFile("dist/.nojekyll", "");
await writeFile(
  "dist/404.html",
  `<!doctype html><html lang="en"><meta charset="utf-8"><title>Earlier work archive</title><p>Opening the archive… <a href="./">Open archive</a></p><script>const base=location.pathname.startsWith('/ReactPortfolio/')?'/ReactPortfolio/':'/';const section=location.pathname.toLowerCase().endsWith('/about')?'about':'projects';location.replace(base+'#'+section);</script></html>`,
);
await writeFile(
  "dist/archive-source.json",
  JSON.stringify(
    {
      originalSource: "https://github.com/Ashwin-Iyer1/ReactPortfolio",
      originalCommit: "fc438a6f3beab77c683c3d3fb6b8a3421d339deb",
      currentPortfolio: "https://ashwiniyer.com/",
      archive: true,
    },
    null,
    2,
  ),
);
