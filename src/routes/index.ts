import React from 'react';

import { AnalyticsPage } from '@/pages/analytics-page';
import { CalendarPage } from '@/pages/calendar-page';
import { CreateWorkoutPage } from '@/pages/create-workout-page';
import { LoginPage } from '@/pages/login-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { RegisterPage } from '@/pages/register-page';
import { ReviewPage } from '@/pages/reviews-page';
import { SettingsPage } from '@/pages/settings-page';
import { WorkoutsPage } from '@/pages/workouts-page';
import { ROUTE_PATH } from '@/types/other';

type Route = {
    path: string;
    Component: React.FC;
};

export const publicRoutesArr: Route[] = [
    {
        path: ROUTE_PATH.LOGIN,
        Component: LoginPage,
    },
    {
        path: ROUTE_PATH.REGISTER,
        Component: RegisterPage,
    },
    {
        path: ROUTE_PATH.NOT_FOUND,
        Component: NotFoundPage,
    },
];

export const privateRouteArr: Route[] = [
    {
        path: ROUTE_PATH.CALENDAR,
        Component: CalendarPage,
    },
    {
        path: ROUTE_PATH.ANALYTICS,
        Component: AnalyticsPage,
    },
    {
        path: ROUTE_PATH.CREATE_WORKOUT,
        Component: CreateWorkoutPage,
    },
    {
        path: ROUTE_PATH.EDIT_WORKOUT,
        Component: CreateWorkoutPage,
    },
    {
        path: ROUTE_PATH.WORKOUT,
        Component: WorkoutsPage,
    },
    {
        path: ROUTE_PATH.SETTINGS,
        Component: SettingsPage,
    },
    {
        path: ROUTE_PATH.REVIEWS,
        Component: ReviewPage,
    },
];
