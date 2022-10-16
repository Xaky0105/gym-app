import { FC } from 'react'
// import { useAppDispatch } from '../../../hooks/redux-hook'
// import { toggleConfirmModale } from '../../../store/modaleSlice'
// import styles from './index.module.scss'

// type ConfirmModalePropsType = {
//     message: string,
//     callback: () => void
// }

// export const ConfirmModale:FC<ConfirmModalePropsType> = ({message, callback}) => {
//     const dispatch = useAppDispatch()
//     return (
//         <div className={styles.wrapper}>
//             <p>{message}</p>
//             <div>
//                 <button onClick={callback}>Да</button>
//                 <button onClick={() => dispatch(toggleConfirmModale())}>Нет</button>
//             </div>
//         </div>
//     )
// }