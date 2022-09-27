import React, { useState } from 'react'
import styles from './index.module.scss'
import 'animate.css';

type TTooltipProps = {
    children: React.ReactNode
    text: string
}

const Tooltip: React.FC<TTooltipProps> = ({children, text}) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const onMouseToggler = () => setShowTooltip((prev) => !prev)
    return (
        <span 
            onMouseEnter={onMouseToggler} 
            onMouseLeave={onMouseToggler} 
            className={styles.wrapper}
        >
            {children}
            {showTooltip && <div className={`${styles.tooltip} animate__animated animate__fadeIn animate__delay-1s`}>{text}</div>}
        </span>
    )
}

export default Tooltip