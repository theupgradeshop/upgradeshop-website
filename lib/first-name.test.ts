import { describe, it, expect } from "vitest";
import { firstName, splitName } from "./first-name";

describe("firstName", () => {
  it("takes the first token", () => {
    expect(firstName("  Dana  Levi ")).toBe("Dana");
  });
  it("returns empty for empty input", () => {
    expect(firstName("")).toBe("");
    expect(firstName("   ")).toBe("");
    expect(firstName(undefined)).toBe("");
  });
});

describe("splitName", () => {
  it("splits first and rest", () => {
    expect(splitName("Dana bat Levi")).toEqual({ firstName: "Dana", lastName: "bat Levi" });
  });
  it("handles a single name", () => {
    expect(splitName("Dana")).toEqual({ firstName: "Dana", lastName: "" });
  });
});
