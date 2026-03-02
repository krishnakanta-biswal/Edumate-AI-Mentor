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

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ API Routes
app.use("/api", aiRoutes);
app.use("/api", careerRoutes);

// ✅ Request Logger
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
      // Use Vite in development
      await setupVite(app, server);
    } else {
      // ✅ Production static serving (Render)
      const distPath = path.join(__dirname, "../dist");
      app.use(express.static(distPath));

      // SPA fallback
      app.get("*", (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, "index.html"));
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