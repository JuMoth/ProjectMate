import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if(!connectionString) {
    throw new Error("DATABASE_URL 환경변수가 설정되지 않았습니다.");
}

export const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});