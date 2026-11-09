import { describe, expect, it } from "vitest";
import type { BuildCtx, ProcessedContent } from "@quartz-community/types";
import { ExplicitPublish } from "../src/filter";

const filter = ExplicitPublish();
const ctx = {} as BuildCtx;

function page(data: Record<string, unknown>): ProcessedContent {
  return [{ type: "root", children: [] }, { data }] as unknown as ProcessedContent;
}

describe("ExplicitPublish", () => {
  it("publishes notes with publish: true", () => {
    expect(
      filter.shouldPublish(ctx, page({ relativePath: "a.md", frontmatter: { publish: true } })),
    ).toBe(true);
    expect(
      filter.shouldPublish(ctx, page({ relativePath: "a.md", frontmatter: { publish: "true" } })),
    ).toBe(true);
  });

  it("does not publish notes without it, even when published pages link to them", () => {
    expect(filter.shouldPublish(ctx, page({ relativePath: "a.md", frontmatter: {} }))).toBe(false);
    expect(
      filter.shouldPublish(
        ctx,
        page({ relativePath: "a.md", frontmatter: { publish: false }, referencedBy: ["index"] }),
      ),
    ).toBe(false);
  });

  it("a drawing stored as Markdown follows its own frontmatter", () => {
    const drawing = { relativePath: "boards/Plan.excalidraw.md", referencedBy: ["index"] };
    expect(filter.shouldPublish(ctx, page({ ...drawing, frontmatter: { title: "Plan" } }))).toBe(
      false,
    );
    expect(
      filter.shouldPublish(
        ctx,
        page({ ...drawing, frontmatter: { title: "Plan", publish: true } }),
      ),
    ).toBe(true);
  });

  it("publishes a file without frontmatter when a published page links to it (bases-page#11)", () => {
    for (const relativePath of ["Views.base", "boards/Plan.canvas", "Sketch.excalidraw"]) {
      const fm = { title: "x", tags: [] };
      expect(
        filter.shouldPublish(ctx, page({ relativePath, frontmatter: fm, referencedBy: ["index"] })),
      ).toBe(true);
      expect(
        filter.shouldPublish(ctx, page({ relativePath, frontmatter: fm, referencedBy: [] })),
      ).toBe(false);
      // before Quartz 5.1, filters never saw these pages; a page without referencedBy stays out
      expect(filter.shouldPublish(ctx, page({ relativePath, frontmatter: fm }))).toBe(false);
    }
  });
});
