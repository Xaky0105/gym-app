import { IReview } from '@/types/other';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReviewState } from './types';

const initialState: ReviewState = {
    reviews: [],
    isLoading: false,
    error: null,
};
const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        addReview(state, action: PayloadAction<IReview>) {
            state.reviews.push(action.payload);
        },
        setIsLoadingReview(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        reviewsFetchComplete(state, action) {
            state.reviews = action.payload;
        },
    },
});

export const { addReview, reviewsFetchComplete, setIsLoadingReview } = reviewSlice.actions;

export default reviewSlice.reducer;
