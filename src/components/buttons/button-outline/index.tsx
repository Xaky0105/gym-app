import React from 'react'
import styles from './index.module.scss'

type ButtonOutlinePropsType = {
    callback: () => void
    text: string
}

const ButtonOutline:React.FC<ButtonOutlinePropsType> = ({callback, text}) => {
    return (
        <button 
            className={styles.btnOutline}
            onClick={callback}
        >
            {text}
        </button>
    )
}

export default ButtonOutline