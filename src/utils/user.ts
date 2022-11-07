export const getCurrentUserId = (getState: any) => {
    const {
        user: {
            user: { uid },
        },
    } = getState();
    return uid;
};
