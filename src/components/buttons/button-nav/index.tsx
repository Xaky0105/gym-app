import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss'

type ButtonNavType = {
    name: string
    to?: string
    onClick?: () => void
    marginRight?: string
}

export const ButtonNav:FC<ButtonNavType> = ({name, to, marginRight, onClick}) => {
    const navigate = useNavigate()
    const btnClickHandler = () => {
        onClick && onClick()
        to && navigate(to)
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