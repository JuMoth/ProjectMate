import express from "express";
import cors from "cors";

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

// 기존 API
app.get("/", (req, res) => {
    res.send("ProjectMate Backend Server is running!");
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`ProjectMate Server is running on port ${PORT}`);
});