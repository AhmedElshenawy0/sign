import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { authRouter } from "./routes/auth.js";
import { projectsRouter } from "./routes/projects.js";
import { uploadsRouter } from "./routes/uploads.js";
import { settingsRouter } from "./routes/settings.js";
import { UPLOADS_DIR } from "./lib/storage.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const origin = process.env.CLIENT_ORIGIN ?? "http://localhost:3000";

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

fs.mkdirSync(path.join(UPLOADS_DIR, "videos"), { recursive: true });
fs.mkdirSync(path.join(UPLOADS_DIR, "tmp"), { recursive: true });

app.use(
  cors({
    origin,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/uploads", uploadsRouter);
app.use("/api/settings", settingsRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
