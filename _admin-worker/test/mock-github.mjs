/* GitHub finto in memoria: implementa solo le API che usa il Worker
   (Git Data API, Contents, Commits), con sha content-addressed come Git. */
import { createHash } from "node:crypto";

export function createMockGitHub({ repo, branch = "main", token, files = {} }) {
  const blobs = new Map();
  const trees = new Map();
  const commits = new Map();
  const sha1 = (data) => createHash("sha1").update(data).digest("hex");
  const state = { tokenValid: true, concurrentPushBeforePatch: 0, requests: [] };

  const putBlob = (bytes) => {
    const buf = Buffer.from(bytes);
    const sha = sha1(Buffer.concat([Buffer.from(`blob ${buf.length}\0`), buf]));
    blobs.set(sha, buf);
    return sha;
  };
  const putTree = (map) => {
    const entries = [...map.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
    const sha = sha1("tree " + JSON.stringify(entries));
    trees.set(sha, new Map(entries));
    return sha;
  };
  let clock = Date.parse("2026-09-01T08:00:00Z");
  const putCommit = (tree, parents, message) => {
    const sha = sha1(`commit ${tree} ${parents.join(",")} ${message} ${clock}`);
    commits.set(sha, { sha, tree, parents, message, date: new Date(clock).toISOString() });
    clock += 60_000;
    return sha;
  };

  let head = putCommit(putTree(new Map(Object.entries(files).map(([p, b]) => [p, putBlob(b)]))), [], "init");

  const treeOf = (commitSha) => trees.get(commits.get(commitSha).tree);
  const file = (path) => {
    const blob = treeOf(head).get(path);
    return blob ? new Uint8Array(blobs.get(blob)) : null;
  };
  const history = () => {
    const out = [];
    for (let c = head; c; c = commits.get(c).parents[0]) out.push(commits.get(c));
    return out;
  };
  // come un push da un'altra parte (es. Tommy da terminale) mentre il pannello pubblica
  const pushFromElsewhere = (path, text) => {
    const next = new Map(treeOf(head));
    next.set(path, putBlob(new TextEncoder().encode(text)));
    head = putCommit(putTree(next), [head], `modifica esterna a ${path}`);
  };

  const reply = (status, body) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

  async function handle(url, init = {}) {
    const method = (init.method || "GET").toUpperCase();
    const u = new URL(url);
    const prefix = `/repos/${repo}`;
    const path = u.pathname.startsWith(prefix) ? u.pathname.slice(prefix.length) : null;
    const body = init.body ? JSON.parse(init.body) : null;
    state.requests.push({ method, path, search: u.search });

    if (!state.tokenValid || init.headers?.Authorization !== `Bearer ${token}`) return reply(401, { message: "Bad credentials" });
    if (path === null) return reply(404, { message: "Not Found" });

    if (method === "GET" && path === `/git/ref/heads/${branch}`) return reply(200, { object: { sha: head } });

    let m;
    if (method === "GET" && (m = path.match(/^\/git\/commits\/(\w+)$/))) {
      const c = commits.get(m[1]);
      return c ? reply(200, { sha: c.sha, tree: { sha: c.tree } }) : reply(404, { message: "Not Found" });
    }
    if (method === "POST" && path === "/git/blobs") {
      return reply(201, { sha: putBlob(Buffer.from(body.content, "base64")) });
    }
    if (method === "POST" && path === "/git/trees") {
      const next = new Map(trees.get(body.base_tree));
      for (const e of body.tree) next.set(e.path, e.sha);
      return reply(201, { sha: putTree(next) });
    }
    if (method === "POST" && path === "/git/commits") {
      return reply(201, { sha: putCommit(body.tree, body.parents, body.message) });
    }
    if (method === "PATCH" && path === `/git/refs/heads/${branch}`) {
      if (state.concurrentPushBeforePatch > 0) {
        state.concurrentPushBeforePatch--;
        pushFromElsewhere("README.md", `push concorrente ${state.concurrentPushBeforePatch}`);
      }
      if (!body.force && commits.get(body.sha).parents[0] !== head) return reply(422, { message: "Update is not a fast forward" });
      head = body.sha;
      return reply(200, { object: { sha: head } });
    }
    if (method === "GET" && (m = path.match(/^\/contents\/(.+)$/))) {
      const bytes = file(decodeURIComponent(m[1]));
      if (!bytes) return reply(404, { message: "Not Found" });
      // GitHub spezza il base64 su più righe
      const b64 = Buffer.from(bytes).toString("base64").replace(/.{60}/g, "$&\n");
      return reply(200, { encoding: "base64", content: b64 });
    }
    if (method === "GET" && path === "/commits") {
      const target = u.searchParams.get("path");
      const touched = history().filter((c) => {
        const before = c.parents[0] ? treeOf(c.parents[0]).get(target) : undefined;
        return trees.get(c.tree).get(target) !== before;
      });
      return reply(200, touched.slice(0, Number(u.searchParams.get("per_page") || 30))
        .map((c) => ({ sha: c.sha, commit: { message: c.message, committer: { date: c.date } } })));
    }
    return reply(404, { message: `mock: ${method} ${path} non gestito` });
  }

  return { state, handle, file, history, head: () => head };
}
