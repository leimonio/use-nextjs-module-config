import path from "path";
import next from "next";
import { createServer } from "http";
import { fileURLToPath, parse } from "url";

const PORT = 9988;
const NEXT_ROOT_APP = "next-root";
const NEXT_ROOT_PAGES = "next-root-pages";

const nextRootPath =
  process.argv.length > 2 && process.argv[2] === "--pages"
    ? NEXT_ROOT_PAGES
    : NEXT_ROOT_APP;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextRoot = path.join(__dirname, "..", nextRootPath);

const nextApp = next({
  dev: true,
  dir: nextRoot,
  conf: {
    env: {
      customKey: "my-value",
    },
  },
});

const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.on("error", (err) => console.error(err.message));

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
