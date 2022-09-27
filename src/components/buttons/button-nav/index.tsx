import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss'

type ButtonNavType = {
    name: string
    to: string
    callback?: () => void
    marginRight?: string
}

export const ButtonNav:React.FC<ButtonNavType> = ({name, to, marginRight, callback}) => {
    const navigate = useNavigate()
    const btnClickHandler = () => {
        callback && callback()
        navigate(to)
    }
    return (
        <button 
            className={styles.btn}
            onClick={btnClickHandler}
            style={{marginRight: marginRight}}
        >
            {name}
        </button>
    )
}