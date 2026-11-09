# @quartz-community/explicit-publish

Only publishes pages that have publish: true in their frontmatter.

## Installation

```bash
npx quartz plugin add github:quartz-community/explicit-publish
```

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/explicit-publish
    enabled: true
```

## Files without frontmatter

`.base`, `.canvas` and `.excalidraw` files have no frontmatter to put `publish: true` in. They are
published along with the published pages that link to them (`[[Board.canvas]]`, or an embed that
needs the file's page, such as `![[Board.canvas]]`), and not otherwise — like Obsidian Publish
adding the files a published note links to. A file that only unpublished notes reference, or that
nothing references, is not published. A base embedded in a published note (`![[Views.base]]` or a
` ```base ` block) renders inside that note without getting a page of its own.

A drawing stored as Markdown (`.excalidraw.md`) has frontmatter, and follows its own `publish:`
like a note. This needs Quartz 5.1 or later, which runs the filters on these pages.

## Configuration

This plugin has no configuration options.

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/plugins/ExplicitPublish) for more information.

## License

MIT
