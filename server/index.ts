// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import aiRoutes from "./aiRoutes.js";
import careerRoutes from "./careerRoutes.js";
import { setupVite } from "./vite.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", aiRoutes);
app.use("/api", careerRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});

(async () => {
  try {
    const server = http.createServer(app);

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      // 🔥 CORRECT PATH FOR CLIENT BUILD
      const clientDistPath = path.join(__dirname, "../../client/dist");

      app.use(express.static(clientDistPath));

      app.get("*", (_req: Request, res: Response) => {
        res.sendFile(path.join(clientDistPath, "index.html"));
      });
    }

    const PORT = parseInt(process.env.PORT || "5000", 10);

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
})();

export default app;