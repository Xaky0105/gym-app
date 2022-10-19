import { FC } from 'react';
import { ROUTE_PATH } from '../../types/route';
import { useAppSelector } from '../../hooks/redux-hook';
import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../../store/selectors';

export const PrivateRoute: FC = () => {
    const user = useAppSelector(getUser);
    return user ? <Outlet /> : <Navigate to={ROUTE_PATH.LOGIN} />;
};
