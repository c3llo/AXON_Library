import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { VOICES } from "../app/data/voices.js";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the AXON software library", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AXON Software Library<\/title>/i);
  assert.match(html, /AXON Studio/);
  assert.match(html, /AXON StoryLab/);
  assert.match(html, /AXON YTDN/);
  assert.match(html, /AXON YTMY Checker/);
  assert.match(html, /AXON_YTDN_Release\/releases\/download\/v1\.2\.10\/AXON_YTDN\.exe/);
  assert.match(html, /chromewebstore\.google\.com\/detail\/lfnpgncnfnkkmklbegepgollckpakmim/);
  assert.match(html, /04(?:<!-- -->)? PROGRAMS/);
  assert.match(html, /Voice<span class="tab-badge">91<\/span>/);
  assert.match(html, /이미지<span class="tab-badge">8<\/span>/);
  assert.match(html, /Remotion<span class="tab-badge">427<\/span>/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("excludes the removed training voice", () => {
  assert.equal(VOICES.length, 91);
  assert.equal(VOICES.filter((voice) => voice.category === "male").length, 47);
  assert.equal(VOICES.some((voice) => voice.name === "늑대경제학_목소리_학습용"), false);
});

test("ships every image style preview and copyable prompt", async () => {
  const catalogUrl = new URL("../app/data/imageStyles.json", import.meta.url);
  const catalog = JSON.parse(await readFile(catalogUrl, "utf8"));

  assert.equal(catalog.styles.length, 8);
  for (const style of catalog.styles) {
    const imageUrl = new URL(`../public/image-styles/${style.id}.webp`, import.meta.url);
    const promptUrl = new URL(`../public/image-styles/${style.promptFile}`, import.meta.url);
    await access(imageUrl);
    const prompt = await readFile(promptUrl, "utf8");
    assert.ok(prompt.length > 1000, `${style.id} prompt should contain the full style instructions`);
  }
});

test("ships the complete Remotion animation catalog", async () => {
  const catalogUrl = new URL("../public/remotion-catalog/catalog-data.js", import.meta.url);
  const source = await readFile(catalogUrl, "utf8");
  const context = { window: {} };
  runInNewContext(source, context);

  const catalog = context.window.REMOTION_CATALOG;
  assert.ok(Array.isArray(catalog));
  assert.equal(catalog.length, 21);
  const totalItems = catalog.reduce((sum, category) => sum + category.items.length, 0);
  assert.equal(totalItems, 427);

  for (const file of ["index.html", "details.html", "detail.css", "detail-app.js"]) {
    await access(new URL(`../public/remotion-catalog/${file}`, import.meta.url));
  }
});
