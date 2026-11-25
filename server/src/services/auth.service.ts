import bcrypt from "bcryptjs";

import {
    createUser,
    findUserByEmail
} from "../respositories/auth.repository";

import type {
    LoginRequestBody,
    PublicUser,
    SignupRequestBody,
} from "../types/auth.types";

export class AuthServiceError extends Error {
    constructor(
        message: string,
        public statusCode: number,
    ) {
        super(message);
        this.name = "AuthServiceError";
    }
}

const isPostgresUniqueViolation = (
    error: unknown,
): error is { code: string } => {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505"
    );
};

export const registerUser = async (
    body: SignupRequestBody,
): Promise<PublicUser> => {
    if (typeof body !== "object" || body === null) {
        throw new AuthServiceError("입력값을 확인해 주세요.", 400);
    }

    const { email, password, nickname } = body;

    if(
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof nickname !== "string"
    ) {
        throw new AuthServiceError("입력값을 확인해 주세요.", 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedNickname = nickname.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        throw new AuthServiceError("올바른 이메일 형식을 입력해 주세요.", 400);
    }

    if(normalizedEmail.length > 255) {
        throw new AuthServiceError("이메일은 255자 이하여야 합니다.", 400);
    }

    if(trimmedNickname.length < 2 || trimmedNickname.length > 20) {
        throw new AuthServiceError(
            "닉네임은 2자 이상 20자 이하로 입력해 주세요.",
            400,
        );
    }

    if(password.trim().length < 8) {
        throw new AuthServiceError(
            "비밀번호는 공백을 제외하고 8자 이상 입력해 주세요.",
            400,
        );
    }

    if(Buffer.byteLength(password, "utf8") > 72) {
        throw new AuthServiceError(
            "비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.",
            400,
        );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        return await createUser(
            normalizedEmail,
            passwordHash,
            trimmedNickname,
        );
    } catch(error) {
        if(isPostgresUniqueViolation(error)) {
            throw new AuthServiceError(
                "이미 가입된 이메일입니다.",
                409,
            );
        }

        throw error;
    }
}

export const loginUser = async (
    body: LoginRequestBody,
): Promise<PublicUser> => {
    if(typeof body !== "object" || body === null) {
        throw new AuthServiceError("입력값을 확인해 주세요.", 400);
    }

    const { email, password } = body;

    if(typeof email !== "string" || typeof password !== "string") {
        throw new AuthServiceError("이메일과 비밀번호를 입력해 주세요.", 400);
    }

    const normalizedEmail = email.trim().toLowerCase();

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        throw new AuthServiceError("올바름 이메일 형식을 입력해 주세요.", 400);
    }

    if(password.trim().length < 8) {
        throw new AuthServiceError("비밀번호를 확인해 주세요.", 400);
    }

    const user = await findUserByEmail(normalizedEmail);

    if(!user) {
        throw new AuthServiceError(
            "이메일 또는 비밀번호가 올바르지 않습니다.",
            401,
        );
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password_hash,
    );

    if(!passwordMatches) {
        throw new AuthServiceError(
            "이메일 또는 비밀번호가 올바르지 않습니다.",
            401,
        );
    }

    return {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        created_at: user.created_at.toISOString(),
    };
};