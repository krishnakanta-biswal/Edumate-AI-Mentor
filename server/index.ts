// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import http from "http";
import aiRoutes from "./aiRoutes.js";
import careerRoutes from "./careerRoutes.js";
import { setupVite, serveStatic, log } from "./vite.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Routes
app.use("/api", aiRoutes);
app.use("/api", careerRoutes);

// ✅ Request Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});

// ✅ Wrap everything in async so we can use await
(async () => {
  try {
    // Create an HTTP server for Vite HMR to hook into
    const server = http.createServer(app);

    if (app.get("env") === "development") {
      // Pass both app and server ✅
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // ✅ Start server
    const PORT = parseInt(process.env.PORT || "5000", 10);
    server.listen(PORT, "0.0.0.0", () => {
      log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
})();

export default app;
