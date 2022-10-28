import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux-hook';
import { getUser } from '@/store/selectors';
import { ROUTE_PATH } from '@/types/route';

export const PrivateRoute: FC = () => {
    const user = useAppSelector(getUser);
    return user ? <Outlet /> : <Navigate to={ROUTE_PATH.LOGIN} />;
};
