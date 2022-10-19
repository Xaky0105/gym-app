import { createSlice } from '@reduxjs/toolkit';

type User = {
    [key: string]: string;
};

type UserState = {
    user: User | null;
    error: string | null;
    isLoading: boolean;
};

const initialState: UserState = {
    user: null,
    error: null,
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
        },
        removeUser(state) {
            state.user = null;
            state.error = null;
        },
        setIsLoadingUser(state, action) {
            state.isLoading = action.payload;
        },
        setErrorUser(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { setUser, removeUser, setIsLoadingUser, setErrorUser } = userSlice.actions;

export default userSlice.reducer;
