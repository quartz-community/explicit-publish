import type { QuartzFilterPlugin } from "@quartz-community/types";

/**
 * Publishes pages whose frontmatter has `publish: true`.
 *
 * Files without frontmatter (`.base`, `.canvas`, `.excalidraw` pages, which page types render
 * from the file itself) have no way to opt in. They are published along with the published pages
 * that link to them, like Obsidian Publish adds the files a published note links to: Quartz 5.1+
 * runs the filters on such pages with `file.data.referencedBy` set to those pages. A file only
 * embedded or linked by unpublished notes, or by nothing, is not published.
 */
export const ExplicitPublish: QuartzFilterPlugin = () => ({
  name: "ExplicitPublish",
  shouldPublish(_ctx, [_tree, vfile]) {
    const frontmatter = vfile.data?.frontmatter as Record<string, unknown> | undefined;
    if (frontmatter?.publish === true || frontmatter?.publish === "true") return true;

    const relativePath = vfile.data?.relativePath;
    if (typeof relativePath === "string" && !relativePath.toLowerCase().endsWith(".md")) {
      const referencedBy = (vfile.data as Record<string, unknown>).referencedBy;
      return Array.isArray(referencedBy) && referencedBy.length > 0;
    }
    return false;
  },
});
