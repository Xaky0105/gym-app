import { RootState } from './../index';

export const selectUser = ({ user: { user } }: RootState) => user;
export const selectUserError = ({ user: { error } }: RootState) => error;
export const selectUserIsLoading = ({ user: { isLoading } }: RootState) => isLoading;
export const selectUserName = (state: RootState) => state.user.user?.displayName;
export const selectUserPhoto = (state: RootState) => state.user.user?.photoURL;
export const selectIsUserProviderIdWithGoogle = ({ user: { user } }: RootState) => {
    const userSeriable = JSON.parse(JSON.stringify(user));
    return userSeriable.providerData[0].providerId === 'google.com';
};
