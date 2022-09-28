import {FC} from "react";
import styles from './index.module.scss'

type ButtonStandartPropsType = {
    handleClick: () => void
    name: string
}

const ButtonStandart:FC<ButtonStandartPropsType> = ({handleClick, name}) => {
    return (
        <button
            className={styles.btn}
            onClick={() => handleClick()}
        >
            {name}
        </button>
    )
}

export default ButtonStandart