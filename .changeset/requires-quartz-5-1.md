---
"@quartz-community/explicit-publish": minor
---

Requires Quartz 5.1 (`quartz.quartzVersion: ">=5.1.0"`): it decides about `.base`, `.canvas` and drawing pages through `file.data.referencedBy` and the filters on virtual pages; on Quartz 5.0 those pages would be published regardless. On an older Quartz the build warns, and fails in CI; update Quartz with `npx quartz upgrade`.
