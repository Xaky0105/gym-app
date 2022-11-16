import { FC } from 'react';

import { ButtonOutline } from '@/components/buttons/button-outline';
import { ChangeImgPopup } from '@/components/modals/change-image';
import { Container } from '@/compound/container';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectIsOpenChangeAvatarModal } from '@/store/modal/selectors';
import { setChangeAvatarModalIsOpen } from '@/store/modal/slice';
import { selectUserPhoto } from '@/store/user/selectors';

import styles from './index.module.scss';

export const SettingsPage: FC = () => {
    const dispatch = useAppDispatch();
    const userPhoto = useAppSelector(selectUserPhoto);
    const isOpenCHangeAvatarModal = useAppSelector(selectIsOpenChangeAvatarModal);

    return (
        <Container>
            <h2 className={styles.title}>Настройки пользователя</h2>
            <div className={styles.settingsImg}>
                <div className={styles.imgWrapper}>
                    <img src={userPhoto} alt="avatar" />
                </div>
            </div>
            <div className={styles.btnWrap}>
                <ButtonOutline
                    text="Сменить фото профиля"
                    handleClick={() => dispatch(setChangeAvatarModalIsOpen(true))}
                />
            </div>
            <ChangeImgPopup
                isOpened={isOpenCHangeAvatarModal}
                onClose={() => dispatch(setChangeAvatarModalIsOpen(false))}
            />
        </Container>
    );
};
