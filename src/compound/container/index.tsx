import React from "react";
import styles from './index.module.scss'

type ContainerPropsType = {
    children: React.ReactNode
}

export const Container:React.FC<ContainerPropsType> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}