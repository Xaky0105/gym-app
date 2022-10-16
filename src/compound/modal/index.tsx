import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook'
import { toggleModale } from '../../store/slices/modaleSlice'
import { getIsOpenModalWorkout, getSelectedDay } from '../../store/selectors'
import { MdOutlineClose } from 'react-icons/md'
import dayjs from 'dayjs'
import styles from './index.module.scss'

type ModaleTypeProps = {
    children: React.ReactNode
}

export const Modale:FC<ModaleTypeProps> = ({children}) => {
    const dispatch = useAppDispatch()
    const daySelected = useAppSelector(getSelectedDay)
    const isOpen = useAppSelector(getIsOpenModalWorkout)
    if (!isOpen) {
        return null
    }
    return ReactDOM.createPortal(
        <>
            <div 
                className={styles.mask} 
                onClick={() => dispatch(toggleModale())}>
            </div>
            <div className={styles.modale}>
                <div className={styles.header}>
                    <p>{dayjs(daySelected).format('DD/MM/YYYY') }</p>
                    <div 
                        className={styles.cross}
                        onClick={() => {dispatch(toggleModale())}}
                    >
                        <MdOutlineClose/>
                    </div>
                </div>
                {children}
            </div>
        </>,
        document.getElementById('modal') as Element
    )
}