import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /Voice/);
  assert.match(html, /이미지<span class="tab-badge">8<\/span>/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
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
