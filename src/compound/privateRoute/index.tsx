import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux-hook';
import { selectUser } from '@/store/user/selectors';
import { ROUTE_PATH } from '@/types/route';

export const PrivateRoute: FC = () => {
    const user = useAppSelector(selectUser);
    return user ? <Outlet /> : <Navigate to={ROUTE_PATH.LOGIN} />;
};
