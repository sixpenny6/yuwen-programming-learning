import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { createServer } from "vite";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(
  await fs.readFile(path.join(root, "products.json"), "utf8"),
);
const language = process.argv[2] || "c";
if (!products[language]) throw new Error("请选择 c 或 cpp");
const runtime =
  process.env.LEARNING_ELECTRON_RUNTIME ||
  path.join(root, "vendor/electron-runtime");
const executable = path.join(runtime, "像学习语文一样学习编程.exe");
await fs.access(executable).catch(() => {
  throw new Error(
    "请先运行 python scripts/download-build-tools.py 准备官方 Electron 开发宿主",
  );
});
try {
  await fs.access(path.join(runtime, "resources/app.asar"));
  throw new Error(
    "开发宿主不能带有另一个应用的 app.asar，请使用下载脚本准备的官方 Electron",
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
await fs.writeFile(
  path.join(root, "electron/product.json"),
  JSON.stringify(products[language], null, 2),
);
process.env.LEARNING_LANGUAGE = language;
const server = await createServer({
  root,
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
});
await server.listen();
const env = { ...process.env, VITE_DEV_SERVER_URL: "http://127.0.0.1:5173" };
delete env.ELECTRON_RUN_AS_NODE;
const app = spawn(executable, [root], {
  cwd: root,
  env,
  stdio: "inherit",
  windowsHide: true,
  shell: false,
});
const close = async () => {
  if (!app.killed) app.kill();
  await server.close();
};
app.once("exit", async (code) => {
  await server.close();
  process.exitCode = code || 0;
});
app.once("error", async (error) => {
  console.error(error.message);
  await close();
  process.exitCode = 1;
});
process.once("SIGINT", close);
