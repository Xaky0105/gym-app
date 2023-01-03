import { FC } from 'react';

import { ReviewContent } from '@/components/modals/review-content';
import { Review } from '@/components/review';
import { Container } from '@/compound/container';
import { ReviewPopup } from '@/compound/review-popup';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectIsOpenReviewModal } from '@/store/modal/selectors';
import { setReviewModalIsOpen } from '@/store/modal/slice';
import { selectReviews } from '@/store/reviews/selectors';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

import styles from './index.module.scss';

export const ReviewPage: FC = () => {
    const isShowReviewModal = useAppSelector(selectIsOpenReviewModal);
    const reviews = useAppSelector(selectReviews);
    const reviewsSortByDate = reviews && [...reviews].sort((a, b) => +b.createdReviewAt - +a.createdReviewAt);
    const dispatch = useAppDispatch();
    return (
        <Container>
            <h2 className={styles.title}>Отзывы о приложении</h2>
            <div className={styles.wrapper}>
                <div className={styles.reviewContainer}>
                    {reviews && reviewsSortByDate.map((review) => <Review key={review.id} review={review} />)}
                </div>
                <Fab
                    style={{ backgroundColor: '#87b6bc' }}
                    sx={{
                        position: 'sticky',
                        bottom: '5%',
                        left: '100%',
                        width: 50,
                        height: 50,
                    }}
                    size="medium"
                    onClick={() => dispatch(setReviewModalIsOpen(true))}
                >
                    <EditIcon />
                </Fab>
            </div>
            <ReviewPopup isOpened={isShowReviewModal} onClose={() => dispatch(setReviewModalIsOpen(false))}>
                <ReviewContent />
            </ReviewPopup>
        </Container>
    );
};
