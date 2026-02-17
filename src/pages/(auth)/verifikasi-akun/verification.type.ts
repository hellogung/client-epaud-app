// Send Verification Request/Response
export type SendVerificationRequest = {
    user_id: string;
};

export type SendVerificationResponse = {
    success: boolean;
    message: string;
};

// Verify Account Request/Response
export type VerifyAccountRequest = {
    user_id: string;
    code: string;
};

export type VerifyAccountResponse = {
    success: boolean;
    message: string;
};
