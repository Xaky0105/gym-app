import { FC } from 'react';
import dayjs from 'dayjs';

import { IReview } from '@/types/other';
import Rating from '@mui/material/Rating';

import styles from './index.module.scss';

type ReviewType = {
    review: IReview;
};

export const Review: FC<ReviewType> = ({ review }) => {
    const createdAccount = dayjs(Number(review.createdAccountAt)).format('DD.MM.YYYY');
    const createdReview = dayjs(Number(review.createdReviewAt)).format(`DD.MM.YYYY / HH:mm:ss`);
    return (
        <div className={styles.review}>
            <div className={styles.header}>
                <Rating name="disabled" value={+review.rating} disabled size="small" />
                <p>{createdReview}</p>
            </div>

            <div className={styles.wrap}>
                <div className={styles.aboutUser}>
                    <div className={styles.imgWrap}>
                        <img src={review.img} alt="avatar" />
                    </div>
                    <p className={styles.registerTitle}>В системе с :</p>
                    <p>{createdAccount}</p>
                </div>

                <div className={styles.messageBlock}>
                    <p className={styles.name}>{review.name}</p>
                    <p className={styles.message}>{review.message}</p>
                </div>
            </div>
        </div>
    );
};
