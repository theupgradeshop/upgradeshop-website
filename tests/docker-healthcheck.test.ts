// @vitest-environment node
import { readFileSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

// HEALTHCHECK_COMPOSE lets a test point at a copy of the old bytes (red proof); default is the checkout file.
const compose = readFileSync(
  process.env.HEALTHCHECK_COMPOSE ?? path.resolve(__dirname, "../docker-compose.yml"),
  "utf8",
);
const dockerfile = readFileSync(path.resolve(__dirname, "../Dockerfile"), "utf8");

describe("container healthcheck", () => {
  it("probes /api/health with wget --spider -q, not the rendered home page", () => {
    const m = /healthcheck:\s*\n\s*test:\s*\[([^\]]*)\]/.exec(compose);
    expect(m).not.toBeNull();
    const test = m![1];
    expect(test).toContain('"wget"');
    expect(test).toContain('"--spider"');
    expect(test).toContain('"-q"');
    expect(test).toContain('"http://127.0.0.1:3000/api/health"');
  });

  it("has no second HEALTHCHECK in the Dockerfile", () => {
    expect(dockerfile).not.toMatch(/^\s*HEALTHCHECK/m);
  });
});
