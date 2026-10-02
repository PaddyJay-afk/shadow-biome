import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const outDir = path.resolve(process.env.ATLAS_QA_OUTPUT ?? "screenshots");
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
    : {}),
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
  ...(process.env.ATLAS_QA_PROXY
    ? { proxy: { server: process.env.ATLAS_QA_PROXY, bypass: "127.0.0.1,localhost" } }
    : {}),
});
const results = [];
try {
  for (const url of (process.env.ATLAS_QA_URLS ?? "http://127.0.0.1:8081").split(",")) {
    const port = new URL(url).port || "443";
    for (const width of [320, 390, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      if (process.env.ATLAS_QA_ISOLATE_BRANDING === "1")
        await page.route("https://grok.com/grok-app-builder/extensions.js", (route) =>
          route.fulfill({
            status: 200,
            contentType: "application/javascript",
            body: "/* Third-party branding isolated in local QA. */",
          }),
        );
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      const response = await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.locator(".globe-host canvas").waitFor({ timeout: 20000 });
      await page.waitForFunction(() => !document.querySelector(".atlas-loading"));
      await page.waitForTimeout(1800);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
        false,
        `overflow ${port}/${width}`,
      );
      await page.getByRole("button", { name: "Layers", exact: true }).click();
      await page.getByRole("button", { name: "Fault lines", exact: true }).click();
      assert.equal(
        await page
          .getByRole("button", { name: "Fault lines", exact: true })
          .getAttribute("aria-pressed"),
        "true",
      );
      await page.getByLabel("Earth opacity", { exact: true }).fill("42");
      assert.match(await page.locator(".atlas-opacity").innerText(), /42%/);
      await page.getByLabel("Focus research site").selectOption("nttr");
      assert.match(await page.locator(".atlas-readout").innerText(), /Groom Lake/);
      await page.getByRole("button", { name: "Zoom in", exact: true }).click();
      await page.getByRole("button", { name: "Zoom out", exact: true }).click();
      await page.getByRole("button", { name: "Rotate Earth", exact: true }).click();
      await page.getByRole("button", { name: "Pause rotation", exact: true }).click();
      await page.getByRole("button", { name: "Layers", exact: true }).click();
      await page.getByRole("button", { name: "Reset Earth view", exact: true }).click();
      await page.getByLabel("Earth opacity", { exact: true }).fill("88");
      if (width === 390 || width === 1440) {
        await page
          .locator(".atlas-console")
          .screenshot({ path: path.join(outDir, `shadow-${port}-${width}-atlas.png`) });
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({
          path: path.join(outDir, `shadow-${port}-${width}-page.png`),
          fullPage: false,
        });
      }
      await page.getByRole("button", { name: "2D Map", exact: true }).click();
      assert.ok(await page.locator(".atlas-flat svg").count());
      await page.getByRole("button", { name: "3D Earth", exact: true }).click();
      await page.locator(".globe-host canvas").waitFor();
      if (width < 1024) {
        await page.getByRole("button", { name: "Open menu", exact: true }).click();
        await page
          .getByRole("navigation", { name: "Mobile navigation" })
          .getByRole("link", { name: "Notes", exact: true })
          .click();
      } else
        await page
          .getByRole("navigation", { name: "Main navigation" })
          .getByRole("link", { name: "Notes", exact: true })
          .click();
      await page
        .getByLabel("Place (public land, range-adjacent town, park)")
        .fill("QA public park");
      await page.getByLabel("Notes", { exact: true }).fill("A reversible browser-local test note.");
      await page.getByRole("button", { name: "Save in this browser", exact: true }).click();
      await page.getByRole("heading", { name: "QA public park", exact: true }).waitFor();
      await page.reload();
      await page.getByRole("heading", { name: "QA public park", exact: true }).waitFor();
      await page.getByRole("button", { name: "Remove", exact: true }).click();
      assert.equal(
        await page.getByRole("heading", { name: "QA public park", exact: true }).count(),
        0,
      );
      assert.deepEqual(errors, [], `console/runtime errors ${port}/${width}`);
      results.push({ port, width, status: response.status(), errors });
      await page.close();
    }
  }
  fs.writeFileSync(path.join(outDir, "shadow-interactions.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
