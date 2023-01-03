import { FC } from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import { ButtonStandard } from '@/components/buttons/button-standard';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { reviewScheme } from '@/scheme';
import { setReviewModalIsOpen } from '@/store/modal/slice';
import { addReviewAsync } from '@/store/reviews/asyncActions';
import { selectIsLoadingReview } from '@/store/reviews/selectors';
import Rating from '@mui/material/Rating';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

import styles from './index.module.scss';

type OnClickSubmitFn = (values: { rating: number; message: string }) => void;

export const ReviewContent: FC = () => {
    const isLoading = useAppSelector(selectIsLoadingReview);

    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const onClickSubmit: OnClickSubmitFn = async ({ rating, message }) => {
        const reviewData = {
            rating,
            message,
            enqueueSnackbar,
        };
        await dispatch(addReviewAsync(reviewData));
        dispatch(setReviewModalIsOpen(false));
    };
    const formik = useFormik({
        initialValues: {
            rating: 0,
            message: '',
        },
        validationSchema: reviewScheme,
        onSubmit: onClickSubmit,
    });

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <form onSubmit={formik.handleSubmit} className={styles.wrapper}>
                <Rating name="rating" size="large" value={+formik.values.rating} onChange={formik.handleChange} />
                <TextField
                    name="message"
                    label="Напишите отзыв"
                    fullWidth
                    multiline
                    rows={7}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    sx={{
                        margin: '30px',
                        '& .MuiFormHelperText-root': {
                            position: 'absolute',
                            top: '100%',
                        },
                        '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#07575b',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#07575b',
                        },
                        '& .MuiInput-root:after': {
                            border: '2px solid #07575b',
                        },
                    }}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                />
                <div className={styles.btnWrapper}>
                    <ButtonStandard
                        name="Готово"
                        type={'submit'}
                        disabled={!(formik.values.message && formik.values.rating)}
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </Slide>
    );
};
