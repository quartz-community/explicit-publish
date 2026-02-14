# @quartz-community/explicit-publish

Only publishes pages that have publish: true in their frontmatter.

## Installation

```bash
npx quartz plugin add github:quartz-community/explicit-publish
```

## Usage

```ts
// quartz.config.ts
import * as ExternalPlugin from "./.quartz/plugins";

const config: QuartzConfig = {
  plugins: {
    filters: [ExternalPlugin.ExplicitPublish()],
  },
};
```

## Configuration

This plugin has no configuration options.

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/) for more information.

## License

MIT
