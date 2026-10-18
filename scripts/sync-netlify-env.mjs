import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const secretKeys = new Set([
  "RESEND_API_KEY",
  "SMTP_PASSWORD",
]);

function parseEnvFile(file) {
  if (!existsSync(file)) return {};
  const result = {};
  for (const line of readFileSync(file, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equals = trimmed.indexOf("=");
    if (equals < 1) continue;
    const key = trimmed.slice(0, equals).trim();
    let value = trimmed.slice(equals + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

function isPlaceholder(value) {
  return /PASTE_|your-|example\.com|re_x{5,}|replace-with|smtp\.example\.com|your-smtp-/i.test(value)
    || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/i.test(value);
}

const example = parseEnvFile(resolve(root, ".env.example"));
const local = {
  ...parseEnvFile(resolve(root, ".env")),
  ...parseEnvFile(resolve(root, ".env.local")),
  ...process.env,
};
const entries = Object.keys(example)
  .map((key) => [key, local[key] || example[key]])
  .filter(([, value]) => value && !isPlaceholder(value));
const skipped = Object.keys(example).filter((key) => !entries.some(([entryKey]) => key === entryKey));

if (!entries.length) {
  console.error("No configured values found. Fill in .env.local, then run this command again.");
  process.exit(1);
}

try {
  execFileSync("netlify", ["status"], { cwd: root, stdio: "ignore", shell: process.platform === "win32" });
} catch {
  console.error("Netlify CLI is not available or this folder is not linked to a Netlify site.");
  console.error("Install it with: npm install --global netlify-cli");
  console.error("Then run: netlify login && netlify link");
  process.exit(1);
}

for (const [key, value] of entries) {
  const args = ["env:set", key, value];
  if (secretKeys.has(key)) args.push("--secret");
  execFileSync("netlify", args, { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  console.log(`Updated ${key}${secretKeys.has(key) ? " (secret)" : ""}`);
}

if (skipped.length) {
  console.log(`Skipped unset/template values: ${skipped.join(", ")}`);
}
console.log("Done. Redeploy the Netlify site for the updated values to take effect.");
