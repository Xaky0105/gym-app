import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook'
import { loadWorkouts } from '../../store/actions/asyncAction'
import { getIsLoadingWorkouts } from '../../store/selectors'
import Header from '../header'
import { Preloader } from '../preloader'
import styles from './index.module.scss'

const Layout:React.FC = () => {
    const dispatch = useAppDispatch()
    const workoutsIsLoading = useAppSelector(getIsLoadingWorkouts)
    useEffect(() => {
        dispatch(loadWorkouts())
    }, [dispatch])
    return (
        <React.Fragment>
            <Header />
            {
                workoutsIsLoading 
                    ?
                    <div className={styles.mask}>
                        <div className={styles.preloaderWrapper}>
                            <Preloader />
                        </div>
                    </div>
                    :
                    <Outlet />
            }
        </React.Fragment> 
    )
}

export default Layout