This is a repository for reproducing an issue with latest Next.js v13.5.

When using Next.js as an imported module `import next from "next";` and running the dev server with providing a configuration object, the configuration object is not respected.

```javascript
import next from "next";
// ...
// ...

next({
  dev: true,
  dir: nextRoot,
  conf: {
    env: {
      customKey: "my-value",
    },
  },
});
```

## Folder structure

* `next-root` - a Next.js app using App Router
* `next-root-pages` - a Next.js app using Pages Router
* `scirpts/next-run.mjs` - the runner using `next` module

## How to reproduce the issue
1. Clone the repo
2. Run `npm run dev:custom` - running the dev server for `next-root`
   Alternatively, run `npm run dev:custom:pages` - running the dev server for `next-root-pages`
3. Open browser at `localhost:9988`
4. Observe `The value of customKey is: ` string is empty without containing any env key.
5. Uncomment the `env` configuration from `next.config.js` and rerun the command in step 2.
6. Observe `The value of customKey is: my-value` string is printing the env key `my-value`.