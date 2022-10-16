import { FC } from 'react'
import styles from './index.module.scss'

type ButtonOutlinePropsType = {
    handleClick: () => void
    text: string
}

export const ButtonOutline:FC<ButtonOutlinePropsType> = ({handleClick, text}) => {
    return (
        <button 
            className={styles.btnOutline}
            onClick={handleClick}
        >
            {text}
        </button>
    )
}