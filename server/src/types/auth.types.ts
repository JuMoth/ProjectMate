export interface SignupRequestBody {
    email: string;
    password: string;
    nickname: string;
}

export interface PublicUser {
    id: string;
    email: string;
    nickname: string;
    created_at: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}