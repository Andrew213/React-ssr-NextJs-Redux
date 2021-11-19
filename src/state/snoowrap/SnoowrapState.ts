export type SnoowrapAuthType = 'auth' | 'appOnly' | null;

export type SnoowrapState = {
    isLoading: boolean;
    receivedAt: Date | null;
    authType: SnoowrapAuthType;
    errorMsg: string;
};
