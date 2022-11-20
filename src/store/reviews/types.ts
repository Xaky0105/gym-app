import { EnqueueSnackbar, IReview } from '@/types/other';

export type ReviewState = {
    reviews: IReview[];
    isLoading: boolean;
    error: null | string;
};

export type ReviewsDataThunk = {
    rating: number;
    message: string;
    enqueueSnackbar: EnqueueSnackbar;
};
