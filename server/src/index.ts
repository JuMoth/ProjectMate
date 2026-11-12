import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import projectRoutes from "./routes/project.routes";
import applicationRoutes from "./routes/application.routes";

import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";

const app = express();
const PORT = 4000;

// CORS 설정
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

// JSON 요청 데이터 처리
app.use(express.json());

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/projects", applicationRoutes);
app.use("/api/projects", projectRoutes);

// 404 Middleware
app.use(notFoundHandler);

// Error Middleware
app.use(errorHandler);

// 서버 실행
app.listen(PORT, () => {
    console.log(`ProjectMate Server is running on port ${PORT}`);
});