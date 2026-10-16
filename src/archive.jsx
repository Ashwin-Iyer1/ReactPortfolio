import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  projects,
  categories,
  parseView,
  serializeView,
  filterProjects,
  readingList,
  sourceCommit,
} from "./archive-model.js";
import "./archive.css";
const current = "https://ashwiniyer.com/";
const selectedFromUrl = () =>
  location.hash.startsWith("#project/") ? location.hash.slice(9) : null;
function App() {
  const [view, setView] = useState(() => parseView(location.search)),
    [selection, setSelection] = useState(selectedFromUrl),
    [notice, setNotice] = useState("");
  const detail = useRef(null);
  useEffect(() => {
    const update = () => {
      setView(parseView(location.search));
      setSelection(selectedFromUrl());
    };
    addEventListener("popstate", update);
    addEventListener("hashchange", update);
    return () => {
      removeEventListener("popstate", update);
      removeEventListener("hashchange", update);
    };
  }, []);
  useEffect(() => {
    if (selection) detail.current?.focus();
  }, [selection]);
  const edit = (patch) => {
    const next = { ...view, ...patch };
    const query = serializeView(next);
    history.replaceState(
      null,
      "",
      location.pathname + (query ? "?" + query : "") + location.hash,
    );
    setView(next);
  };
  const toggle = (id) =>
    edit({
      kept: view.kept.includes(id)
        ? view.kept.filter((x) => x !== id)
        : [...view.kept, id],
    });
  const shown = filterProjects(view),
    chosen = projects.find((p) => p.id === selection);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setNotice(
        "Link copied, including filters and selected public project IDs.",
      );
    } catch {
      setNotice(
        "Clipboard unavailable. Copy the browser address to share this view.",
      );
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([readingList(view.kept)], { type: "text/markdown" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "earlier-work-reading-list.md";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Reading list exported.");
  };
  return (
    <>
      <a className="skip" href="#projects">
        Skip to projects
      </a>
      <div className="current-banner">
        <span>Looking for my latest work?</span>
        <a href={current}>Visit the current portfolio ↗</a>
      </div>
      <header>
        <a className="wordmark" href="#top">
          AI<span> / THE EARLIER WORK</span>
        </a>
        <nav aria-label="Main">
          <a href="#projects">Project index</a>
          <a href="#about">About this archive</a>
          <a
            href="https://github.com/Ashwin-Iyer1"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
      </header>
      <main id="top">
        <section className="hero">
          <div>
            <p className="eyebrow">ASHWIN IYER / REACT PORTFOLIO ARCHIVE</p>
            <h1>
              Every project
              <br />
              starts with
              <br />
              <em>a question.</em>
            </h1>
            <p className="lede">
              An earlier chapter of experiments in automation, robotics, web
              development and AI. Preserved with context, and made easier to
              explore.
            </p>
            <a className="primary button" href="#projects">
              Explore the project index <span>↓</span>
            </a>
          </div>
          <aside className="index-art" aria-label="Archive contents">
            <p className="eyebrow">A SMALL INDEX OF CURIOSITY</p>
            <div>
              <span>01</span>
              <strong>
                Make it
                <br />
                move.
              </strong>
              <small>ROBOTICS</small>
            </div>
            <div>
              <span>02</span>
              <strong>
                Make it
                <br />
                useful.
              </strong>
              <small>TOOLS & AUTOMATION</small>
            </div>
            <div>
              <span>03</span>
              <strong>
                Make it
                <br />
                understandable.
              </strong>
              <small>WEB & DATA</small>
            </div>
            <p>12 entries from the original portfolio.</p>
          </aside>
        </section>
        <section id="projects" className="directory">
          <div className="section-head">
            <div>
              <p className="eyebrow">THE PROJECT INDEX</p>
              <h2>Follow a thread.</h2>
            </div>
            <p>
              Historical entries. Original links.
              <br />
              Current context where it is known.
            </p>
          </div>
          <div className="search-bar">
            <label htmlFor="search">
              Search the archive
              <input
                type="search"
                id="search"
                placeholder="Try robotics, vision, video…"
                maxLength={120}
                value={view.query}
                onChange={(e) => edit({ query: e.target.value })}
              />
            </label>
            <label htmlFor="sort">
              Order
              <select
                id="sort"
                value={view.sort}
                onChange={(e) => edit({ sort: e.target.value })}
              >
                <option value="original">Original portfolio order</option>
                <option value="name">Project name A–Z</option>
              </select>
            </label>
            <button onClick={share}>Copy view link ↗</button>
          </div>
          <div className="filter-row" aria-label="Project categories">
            {categories.map((category) => (
              <button
                key={category}
                aria-pressed={view.category === category}
                onClick={() => edit({ category })}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="list-toolbar">
            <p role="status">
              {shown.length} of {projects.length} projects
            </p>
            <label className="check">
              <input
                type="checkbox"
                checked={view.onlyKept}
                onChange={(e) => edit({ onlyKept: e.target.checked })}
              />{" "}
              Only reading list ({view.kept.length})
            </label>
            <button disabled={!view.kept.length} onClick={download}>
              Export reading list ↓
            </button>
          </div>
          <p className="notice" role="status">
            {notice}
          </p>
          {selection && (
            <section
              className="detail"
              id="project-detail"
              tabIndex={-1}
              ref={detail}
              aria-label="Selected project"
            >
              {chosen ? (
                <>
                  <div className="detail-top">
                    <span className="eyebrow">
                      {chosen.category} / ARCHIVE NOTE
                    </span>
                    <a href="#projects" className="close">
                      Close detail ×
                    </a>
                  </div>
                  <h2>{chosen.title}</h2>
                  <p>{chosen.context}</p>
                  <div className="detail-links">
                    <a
                      className="primary button"
                      href={chosen.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open original reference ↗
                    </a>
                    {chosen.demo && (
                      <a
                        className="button"
                        href={chosen.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Explore interactive companion ↗
                      </a>
                    )}
                  </div>
                  <details>
                    <summary>Read the original portfolio description</summary>
                    <blockquote>{chosen.description}</blockquote>
                    <p className="small">
                      Historical wording from the original project list. It may
                      describe an earlier implementation or a service that has
                      since changed.
                    </p>
                  </details>
                </>
              ) : (
                <>
                  <h2>Project not found.</h2>
                  <p>This archive link does not match a project.</p>
                  <a href="#projects">Return to the index</a>
                </>
              )}
            </section>
          )}
          <div className="project-grid">
            {shown.map((p) => (
              <article className="project" key={p.id}>
                <div className="card-top">
                  <span>
                    {String(p.index + 1).padStart(2, "0")} / {p.category}
                  </span>
                  <button
                    className="save"
                    aria-label={`${view.kept.includes(p.id) ? "Remove" : "Add"} ${p.title} ${view.kept.includes(p.id) ? "from" : "to"} reading list`}
                    aria-pressed={view.kept.includes(p.id)}
                    onClick={() => toggle(p.id)}
                  >
                    {view.kept.includes(p.id) ? "Saved ✓" : "Save +"}
                  </button>
                </div>
                <h3>
                  <a href={`#project/${p.id}`}>{p.title}</a>
                </h3>
                <p>{p.summary}</p>
                <a className="context-link" href={`#project/${p.id}`}>
                  Explore context <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
          {!shown.length && (
            <div className="empty">
              <h3>No projects match this view.</h3>
              <p>
                Try another phrase, category, or clear the reading-list filter.
              </p>
              <button
                onClick={() =>
                  edit({ query: "", category: "All projects", onlyKept: false })
                }
              >
                Reset filters
              </button>
            </div>
          )}
          <p className="small privacy">
            The URL stores filters and selected project IDs so the view is
            shareable. No account, analytics or browser storage is used.
          </p>
        </section>
        <section id="about" className="about">
          <div>
            <p className="eyebrow">CONTEXT MATTERS</p>
            <h2>
              An archive,
              <br />
              with a next chapter.
            </h2>
            <p>
              The original React site captured an early stage of my work. This
              edition keeps its twelve project references while separating
              historical descriptions from current claims.
            </p>
            <p>
              Team and organization projects keep their context. Old
              student-year and award claims are not presented as current
              biography.
            </p>
            <a href={current} className="button primary">
              See what I’m building now ↗
            </a>
          </div>
          <div className="archive-notes">
            <article>
              <span>01 / ORIGINS</span>
              <h3>Original source, preserved.</h3>
              <p>
                The prior components, project list and assets remain in the
                repository. The archive has a separate entry point and a
                smaller, modern build.
              </p>
              <a
                href={`https://github.com/Ashwin-Iyer1/ReactPortfolio/tree/${sourceCommit}`}
                target="_blank"
                rel="noreferrer"
              >
                Read the original revision ↗
              </a>
            </article>
            <article>
              <span>02 / INTERPRETATION</span>
              <h3>Inspect before relying.</h3>
              <p>
                Historical descriptions are not live service guarantees or
                verified performance claims. External links may change
                independently.
              </p>
            </article>
            <article>
              <span>03 / CONTINUITY</span>
              <h3>The current portfolio lives elsewhere.</h3>
              <p>
                For current demos, case studies and professional context, use
                ashwiniyer.com.
              </p>
              <a href={current}>Open the current portfolio ↗</a>
            </article>
          </div>
        </section>
      </main>
      <footer>
        <strong>Ashwin Iyer</strong>
        <span>Earlier work / React archive</span>
        <a
          href="https://github.com/Ashwin-Iyer1/ReactPortfolio"
          target="_blank"
          rel="noreferrer"
        >
          Archive source ↗
        </a>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
