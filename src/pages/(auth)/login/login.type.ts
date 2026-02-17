// Login Request
export type LoginRequest = {
    identifier: string;
    password: string;
};

// Login Response
export type LoginUserData = {
    id: string;
    full_name: string;
    username: string;
    role: string;
};

export type LoginResponse = {
    success: boolean;
    message: string;
    data: {
        access_token: string;
        user: LoginUserData;
    };
};

// Logout Response
export type LogoutResponse = {
    success: boolean;
    message: string;
};
