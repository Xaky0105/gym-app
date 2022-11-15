import { IReview } from '@/types/review';

export type ReviewState = {
    reviews: IReview[];
    isLoading: boolean;
    error: null | string;
};

export type ReviewsDataThunk = {
    rating: number;
    message: string;
};
