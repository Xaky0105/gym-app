type User = {
    [key: string]: string;
};

export type UserState = {
    user: User | null;
    error: string | null;
    isLoading: boolean;
};
