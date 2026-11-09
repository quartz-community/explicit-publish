---
"@quartz-community/explicit-publish": minor
---

Files without frontmatter — `.base`, `.canvas` and `.excalidraw` pages — are published when a published page links to them, and not otherwise (quartz-community/bases-page#11). Before, every such file was published regardless of this filter. Needs Quartz 5.1, which runs the filters on these pages; with older Quartz nothing changes.
