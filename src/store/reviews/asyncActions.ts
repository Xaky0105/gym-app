import dayjs from 'dayjs';
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/firebase';
import { IReview } from '@/types/review';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { addReview, reviewsFetchComplete, setIsLoadingReview } from './slice';
import { ReviewsDataThunk } from './types';

export const addReviewAsync = createAsyncThunk(
    'reviews/addReview',
    async (reviewsData: ReviewsDataThunk, { dispatch, getState }) => {
        const { message, rating } = reviewsData;
        const {
            user: { user },
        } = getState() as any;
        const id = uuidv4();
        dispatch(setIsLoadingReview(true));
        const reviewData: IReview = {
            message,
            rating,
            img: user!.photoURL,
            name: user!.displayName,
            createdAccountAt: user!.reloadUserInfo.createdAt,
            createdReviewAt: dayjs().valueOf().toString(),
            id,
        };
        try {
            const reviewsListRef = doc(db, `userReviews/reviewsList`);
            await updateDoc(reviewsListRef, {
                ['reviews']: arrayUnion(reviewData),
            });
            await dispatch(loadReviewsData());
            dispatch(setIsLoadingReview(false));
        } catch (err) {
            console.log(err);
        }
    },
);

export const loadReviewsData = createAsyncThunk('reviews/fetchReviews', async (_, { dispatch }) => {
    try {
        const reviewsDataSnap = await getDoc(doc(db, `userReviews/reviewsList`));
        const reviewsData: IReview[] = reviewsDataSnap.data()!.reviews;
        dispatch(reviewsFetchComplete(reviewsData));
    } catch (err) {
        console.log(err);
    }
});
