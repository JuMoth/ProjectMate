import { pool } from "../config/database";
import { PublicUser } from "../types/auth.types";

interface UserRow {
    id: string;
    email: string;
    nickname: string;
    created_at: Date;
}

interface UserWithPasswordHash extends UserRow {
    password_hash: string;
}

export const createUser = async (
    email: string,
    passwordHash: string,
    nickname: string,
): Promise<PublicUser> => {
    const result = await pool.query<UserRow>(
        `INSERT INTO public.users (email, password_hash, nickname)
        VALUES ($1, $2, $3)
        RETURNING id, email, nickname, created_at`,
        [email, passwordHash, nickname],
    );

    const user = result.rows[0];

    return {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        created_at: user.created_at.toISOString(),
    };
};

export const findUserByEmail = async (
    email: string,
): Promise<UserWithPasswordHash | null> => {
    const result = await pool.query<UserWithPasswordHash>(
        `SELECT id, email, password_hash, nickname, created_at
         FROM public.users
         WHERE email = $1
         LIMIT 1`,
        [email],
    );

    return result.rows[0] ?? null;
}