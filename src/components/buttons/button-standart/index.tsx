import {FC} from "react";
import styles from './index.module.scss'

type ButtonStandartPropsType = {
    handleClick?: () => void
    name: string
    disabled?: any
}

const ButtonStandart:FC<ButtonStandartPropsType> = ({handleClick, name, disabled}) => {
    return (
        <button
            className={styles.btn}
            onClick={() => handleClick && handleClick()}
            disabled={disabled}
        >
            {name}
        </button>
    )
}

export default ButtonStandart