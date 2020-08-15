declare namespace Express {
    interface Request {
        user?: AuthenticatedUser;
    }

    interface AuthenticatedUser {
        userId: string;
        firstName: string;
        lastName: number;
        email: string;
        accountActivated: boolean;
        token: string;
        roles: string[];
    }
}