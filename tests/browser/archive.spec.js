import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
test("search, category, reading list, export and URL reload work without external requests", async ({
  page,
}) => {
  const external = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4200")) external.push(r.url());
  });
  await page.goto("/");
  await expect(page.locator(".project")).toHaveCount(12);
  await page.screenshot({
    path: "test-results/archive-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Robotics", exact: true }).click();
  await expect(page.locator(".project")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Add 7110A Website to reading list" })
    .click();
  await page.getByRole("checkbox", { name: /Only reading list/ }).check();
  await expect(page.locator(".project")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".project")).toHaveCount(1);
  await expect(
    page.getByRole("checkbox", { name: /Only reading list/ }),
  ).toBeChecked();
  const waiting = page.waitForEvent("download");
  await page.getByRole("button", { name: /Export reading list/ }).click();
  const file = await waiting;
  expect(await readFile(await file.path(), "utf8")).toContain("7110A Website");
  await page.getByLabel("Search the archive").fill("missing");
  await expect(
    page.getByRole("heading", { name: "No projects match this view." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Reset filters", exact: true })
    .click();
  await expect(page.locator(".project")).toHaveCount(12);
  expect(external).toEqual([]);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
});
test("project deep links show source context and close without losing filters", async ({
  page,
}) => {
  await page.goto("/?category=Data+%26+AI#project/home");
  await expect(
    page.getByRole("region", { name: "Selected project" }),
  ).toBeFocused();
  await expect(page.locator(".detail")).toContainText(
    "Dhyan, Ashwin and Spandan",
  );
  await page
    .getByText("Read the original portfolio description", { exact: true })
    .click();
  await expect(page.locator("blockquote")).toContainText("HackUTD");
  await expect(
    page.getByRole("link", { name: "Explore interactive companion ↗" }),
  ).toHaveAttribute("href", "https://ashwin-iyer1.github.io/homereadypro/");
  await page.getByRole("link", { name: "Close detail ×" }).click();
  await expect(page.locator(".detail")).toHaveCount(0);
  await expect(page.locator(".project")).toHaveCount(3);
  await page.goto("/#project/not-a-project");
  await expect(
    page.getByRole("heading", { name: "Project not found." }),
  ).toBeVisible();
});
test("mobile archive stays within viewport and clearly links current portfolio", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 850 });
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Visit the current portfolio ↗" }),
  ).toHaveAttribute("href", "https://ashwiniyer.com/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Data & AI", exact: true }).click();
  await page.getByRole("link", { name: "HomeReady Pro", exact: true }).click();
  await expect(page.locator(".detail")).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/archive-mobile.png",
    fullPage: true,
  });
});
test("legacy page fallback preserves project prefix and ignores historical CNAME", async () => {
  const html = await readFile("dist/404.html", "utf8");
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const [pathname, expected] of [
    ["/ReactPortfolio/About", "/ReactPortfolio/#about"],
    ["/Projects", "/#projects"],
  ]) {
    let target;
    vm.runInNewContext(script, {
      location: { pathname, replace: (value) => (target = value) },
    });
    expect(target).toBe(expected);
  }
  await expect(readFile("dist/CNAME")).rejects.toThrow();
});
