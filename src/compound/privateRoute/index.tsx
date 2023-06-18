import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux-hook';
import { selectUser } from '@/store/user/selectors';
import { ROUTE_PATH } from '@/types/other';

// TODO check it out!
export const PrivateRoute: FC = () => {
    const isLoadingUser = useAppSelector((state) => state.user.isLoading);
    const user = useAppSelector(selectUser);

    if (isLoadingUser) {
        return <div>Loading...</div>;
    }

    return user ? <Outlet /> : <Navigate to={ROUTE_PATH.LOGIN} />;
};
