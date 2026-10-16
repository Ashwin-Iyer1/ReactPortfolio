import test from "node:test";
import assert from "node:assert/strict";
import {
  projects,
  parseView,
  serializeView,
  filterProjects,
  readingList,
} from "../src/archive-model.js";
test("original projects retain unique identities and references", () => {
  assert.equal(projects.length, 12);
  assert.equal(new Set(projects.map((p) => p.id)).size, 12);
  for (const p of projects) {
    assert.match(p.link, /^https:\/\//);
    assert.ok(p.description);
    assert.ok(p.context);
  }
});
test("search, category, ordering and saved filters compose", () => {
  const v = parseView("?category=Robotics&q=team&sort=name");
  assert.deepEqual(
    filterProjects(v).map((p) => p.id),
    ["robot-code", "robot-site"],
  );
  assert.deepEqual(
    filterProjects({ ...v, onlyKept: true, kept: ["robot-site"] }).map(
      (p) => p.id,
    ),
    ["robot-site"],
  );
  assert.equal(filterProjects({ ...v, query: "no matches" }).length, 0);
});
test("views validate unknown values, deduplicate and round trip", () => {
  const v = parseView(
    "?category=bad&sort=bad&keep=home,unknown,home&saved=1&q=home",
  );
  assert.equal(v.category, "All projects");
  assert.equal(v.sort, "original");
  assert.deepEqual(v.kept, ["home"]);
  assert.deepEqual(parseView(serializeView(v)), v);
  assert.equal(
    parseView("?q=" + encodeURIComponent("x".repeat(200))).query.length,
    120,
  );
});
test("export includes only selected public project references", () => {
  const text = readingList(["home", "invalid"]);
  assert.match(text, /HomeReady Pro/);
  assert.match(text, /ashwiniyer.com/);
  assert.doesNotMatch(text, /SkyblockSniper/);
});
