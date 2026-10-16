import original from "./projects.json" with { type: "json" };
export const sourceCommit = "fc438a6f3beab77c683c3d3fb6b8a3421d339deb";
const metadata = [
  [
    "anagrams",
    "Automation",
    "Anagrams solver",
    "An experiment connecting screen mirroring with a word-game solver.",
    "The original description documents iPhone-to-Mac mirroring. Compatibility with current operating systems is not established here.",
  ],
  [
    "trader",
    "Data & AI",
    "ChatGPT vs Gemini trader",
    "An experiment comparing news-sentiment-driven stock selection.",
    "Historical project context, not a live trading recommendation or evidence of investment returns. Check current source for deployment and behavior.",
  ],
  [
    "cookle",
    "Web & games",
    "Cookle",
    "A food guessing game inspired by Wordle.",
    "The original portfolio linked to an externally hosted game. This archive preserves the reference without claiming sole authorship or current availability.",
  ],
  [
    "robot-code",
    "Robotics",
    "7110A robot code",
    "Competition robot software developed with the 7110A team.",
    "Collaborative team code. The original repository remains archived; the companion demonstrates recorded geometry and hypothetical control behavior without operating a robot.",
    "https://ashwin-iyer1.github.io/7110A-Website/code-lab/index.html",
  ],
  [
    "skyblock",
    "Automation",
    "SkyblockSniper",
    "An auction-house tool using the Coflnet API.",
    "The original description places this tool in Hypixel Skyblock. External APIs and game behavior may have changed.",
  ],
  [
    "video",
    "Media tools",
    "TikTok Video Creator",
    "A video editing utility centered on merging and splicing clips.",
    "The original description documents video composition, not automatic publication or present-day platform support.",
  ],
  [
    "robot-site",
    "Robotics",
    "7110A Website",
    "A team website connecting robot mechanisms, people and code.",
    "A collaborative robotics project, now presented as a historical engineering archive with original CAD assets and source-attributed tools.",
    "https://ashwin-iyer1.github.io/7110A-Website/",
  ],
  [
    "driving",
    "Data & AI",
    "Students Drive Safe",
    "A site for experimenting with language-model analysis of driving.",
    "The historical portfolio describes model testing. It does not establish measured road-safety performance or suitability for real driving decisions.",
  ],
  [
    "home",
    "Data & AI",
    "HomeReady Pro",
    "A HackUTD team project exploring home financing.",
    "Original team: Dhyan, Ashwin and Spandan. The current educational studio uses transparent local scenarios rather than issuing loan-approval decisions.",
    "https://ashwin-iyer1.github.io/homereadypro/",
  ],
  [
    "tiktod",
    "Automation",
    "tiktodv4",
    "An earlier browser-automation experiment.",
    "A historical entry from the original portfolio. This archive does not run automation or endorse engagement manipulation.",
  ],
  [
    "chess",
    "Automation",
    "Chess Bot",
    "A computer-vision and Stockfish chess experiment.",
    "The original description combines OpenCV with Stockfish. Inspect current source for supported inputs, platform rules and setup.",
  ],
  [
    "her-impact",
    "Web & games",
    "Her Impact Project",
    "A website connected to the Her Impact Project.",
    "The original organization link is preserved. Ownership, contributions and operations remain with the organization; this archive makes no sole-authorship claim.",
  ],
];
export const projects = original.map((project, index) => {
  const [id, category, title, summary, context, demo] = metadata[index];
  return { ...project, id, category, title, summary, context, demo, index };
});
export const categories = [
  "All projects",
  ...new Set(projects.map((p) => p.category)),
];
export function parseView(search) {
  const p = new URLSearchParams(search),
    category = p.get("category");
  return {
    query: (p.get("q") || "").slice(0, 120),
    category: categories.includes(category) ? category : "All projects",
    sort: p.get("sort") === "name" ? "name" : "original",
    onlyKept: p.get("saved") === "1",
    kept: [
      ...new Set(
        (p.get("keep") || "")
          .split(",")
          .filter((id) => projects.some((p) => p.id === id)),
      ),
    ],
  };
}
export function serializeView(view) {
  const p = new URLSearchParams();
  if (view.query) p.set("q", view.query);
  if (view.category !== "All projects") p.set("category", view.category);
  if (view.sort === "name") p.set("sort", "name");
  if (view.onlyKept) p.set("saved", "1");
  if (view.kept.length) p.set("keep", view.kept.join(","));
  return p.toString();
}
export function filterProjects(view) {
  const query = view.query.trim().toLocaleLowerCase();
  const filtered = projects.filter(
    (p) =>
      (view.category === "All projects" || p.category === view.category) &&
      (!view.onlyKept || view.kept.includes(p.id)) &&
      (!query ||
        [p.title, p.name, p.summary, p.description, p.category]
          .join(" ")
          .toLocaleLowerCase()
          .includes(query)),
  );
  return view.sort === "name"
    ? filtered.toSorted((a, b) => a.title.localeCompare(b.title))
    : filtered;
}
export function readingList(ids) {
  return (
    "# Earlier work reading list\n\nSelected historical projects. Current work: https://ashwiniyer.com/\n\n" +
    projects
      .filter((p) => ids.includes(p.id))
      .map(
        (p) =>
          `## ${p.title}\n${p.summary}\n\n${p.link}\n${p.demo ? "\nInteractive companion: " + p.demo + "\n" : ""}`,
      )
      .join("\n")
  );
}
