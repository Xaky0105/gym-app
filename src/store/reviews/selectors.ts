import { RootState } from './../index';

export const selectReviews = ({ reviews: { reviews } }: RootState) => reviews;
export const selectIsLoadingReview = ({ reviews: { isLoading } }: RootState) => isLoading;
