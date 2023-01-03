import { FC } from 'react';

import { ButtonOutline } from '@/components/buttons/button-outline';
import { ChangeImgPopup } from '@/components/modals/change-image';
import { DeleteContent } from '@/components/modals/confirm-content/delete-content';
import { ConfirmPopup } from '@/compound/confirm-popup';
import { Container } from '@/compound/container';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectIsOpenChangeAvatarModal, selectIsOpenConfirmModal } from '@/store/modal/selectors';
import { setChangeAvatarModalIsOpen, setConfirmModalIsOpen } from '@/store/modal/slice';
import { deleteUserFromApp } from '@/store/user/asyncActions';
import { selectUserPhoto } from '@/store/user/selectors';

import styles from './index.module.scss';

export const SettingsPage: FC = () => {
    const dispatch = useAppDispatch();
    const userPhoto = useAppSelector(selectUserPhoto);
    const isOpenCHangeAvatarModal = useAppSelector(selectIsOpenChangeAvatarModal);
    const isOpenConfirmModal = useAppSelector(selectIsOpenConfirmModal);

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
            <div className={styles.btnWrap}>
                <ButtonOutline
                    color="red"
                    text="Удалить аккаунт"
                    handleClick={() => dispatch(setConfirmModalIsOpen(true))}
                />
            </div>
            <ChangeImgPopup
                isOpened={isOpenCHangeAvatarModal}
                onClose={() => dispatch(setChangeAvatarModalIsOpen(false))}
            />
            <ConfirmPopup isOpened={isOpenConfirmModal} onClose={() => dispatch(setConfirmModalIsOpen(false))}>
                <DeleteContent
                    message="Вы действительно хотите удалить аккаунт?"
                    onOk={() => dispatch(deleteUserFromApp())}
                />
            </ConfirmPopup>
        </Container>
    );
};
