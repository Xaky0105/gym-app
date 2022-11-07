import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './../index';

export const selectUser = ({ user: { user } }: RootState) => user;
export const selectUserError = ({ user: { error } }: RootState) => error;
export const selectUserIsLoading = ({ user: { isLoading } }: RootState) => isLoading;
export const selectUserName = (state: RootState) => state.user.user?.displayName;
export const selectUserPhoto = (state: RootState) => state.user.user?.photoURL;

export const selectUserPhotoByName = createSelector(selectUserName, selectUserPhoto, (name, photo) => {
    return (
        photo ||
        `https://ui-avatars.com/api/?size=128&name=${name}&font-size=0.53&background=ccc&color=fff&rounded=true`
    );
});
