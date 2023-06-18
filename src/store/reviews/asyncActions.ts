import dayjs from 'dayjs';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/firebase';
import { IReview } from '@/types/other';

import { reviewsFetchComplete, setIsLoadingReview } from './slice';
import { ReviewsDataThunk } from './types';
import { createAppThunk } from '../utils/thunk';

export const addReviewAsync = createAppThunk(
    'reviews/addReview',
    async (reviewsData: ReviewsDataThunk, { dispatch, getState }) => {
        const { message, rating, enqueueSnackbar } = reviewsData;
        const {
            user: { user },
        } = getState();
        const id = uuidv4();
        const reviewData: IReview = {
            message,
            rating,
            id,
            img: user!.photoURL,
            name: user!.displayName,
            // @ts-expect-error
            createdAccountAt: user!.reloadUserInfo.createdAt,
            createdReviewAt: dayjs().valueOf().toString(),
        };
        dispatch(setIsLoadingReview(true));
        try {
            const reviewsListRef = doc(db, `userReviews/reviewsList`);
            await updateDoc(reviewsListRef, {
                ['reviews']: arrayUnion(reviewData),
            });
            await dispatch(loadReviewsData());
            enqueueSnackbar('Ваш отзыв успешно добавлен', { variant: 'success' });
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не удалось добавить отзыв', { variant: 'error' });
        }
        dispatch(setIsLoadingReview(false));
    },
);

export const loadReviewsData = createAppThunk('reviews/fetchReviews', async (_, { dispatch }) => {
    try {
        const reviewsDataSnap = await getDoc(doc(db, `userReviews/reviewsList`));
        const reviewsData: IReview[] = reviewsDataSnap.data()!.reviews;
        dispatch(reviewsFetchComplete(reviewsData));
    } catch (err) {
        console.log(err);
    }
});
