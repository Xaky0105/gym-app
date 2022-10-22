import { FC, memo } from 'react';
import { WorkoutList } from '../workout-list';
import { ButtonStandart } from '../../../components/buttons/button-standart';
import { ROUTE_PATH } from '../../../types/route';
import { useNavigate } from 'react-router-dom';
import { Left } from '../../../compound/container-two-part/left';
import styles from './index.module.scss';

type LeftSidePropsType = {
    setWorkoutClickHandlerCallback: (id: string | null) => void;
};

export const LeftSide: FC<LeftSidePropsType> = memo(({ setWorkoutClickHandlerCallback }) => {
    const navigate = useNavigate();
    const btnClickHandler = () => {
        navigate(ROUTE_PATH.CREATE_WORKOUT);
    };
    return (
        <Left title="Cписок ваших тренировок">
            <div className={styles.block}>
                <div className={styles.content}>
                    <WorkoutList setWorkoutClickHandlerCallback={setWorkoutClickHandlerCallback} />
                </div>
                <ButtonStandart name="Создать тренировку" handleClick={btnClickHandler} />
            </div>
        </Left>
    );
});
