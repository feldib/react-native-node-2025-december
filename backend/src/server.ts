import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/users";
import eventRoutes from "./routes/events";
import approvalRoutes from "./routes/approvals";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/approvals", approvalRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Initialize database connection and start server
AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    // Run migrations
    await AppDataSource.runMigrations();
    console.log("Migrations have been run!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  });

export default app;
