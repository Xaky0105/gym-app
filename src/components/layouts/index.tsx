import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/header';
import { Preloader } from '@/components/preloader';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { loadReviewsData } from '@/store/reviews/asyncActions';
import { loadWorkoutsData } from '@/store/workout/asyncActions';
import { selectIsLoadingWorkouts } from '@/store/workout/selectors';

import styles from './index.module.scss';

export const Layout: React.FC = () => {
    const dispatch = useAppDispatch();
    const workoutsIsLoading = useAppSelector(selectIsLoadingWorkouts);
    useEffect(() => {
        dispatch(loadWorkoutsData());
        dispatch(loadReviewsData());
    }, []);
    return (
        <React.Fragment>
            <Header />
            {workoutsIsLoading ? (
                <div className={styles.mask}>
                    <div className={styles.preloaderWrapper}>
                        <Preloader />
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </React.Fragment>
    );
};
