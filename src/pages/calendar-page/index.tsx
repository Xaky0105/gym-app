import { FC } from 'react';

import { CalendarHeader } from '@/components/calendar-header';
import { Month } from '@/components/month';
import { Container } from '@/compound/container';

export const CalendarPage: FC = () => {
    return (
        <Container>
            <CalendarHeader />
            <Month />
        </Container>
    );
};
