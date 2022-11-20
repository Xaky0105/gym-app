import { Coordinates, Dimensions } from '@/types/other';

type DayCoordinates = {
    left: number;
    top: number;
} & Dimensions;

type CalendarPopupCoordinates = {
    monthSize: Coordinates;
    modalSize: Coordinates;
    dayCoordinates: DayCoordinates;
    windowSize: Coordinates;
};

export const getCalendarPopupCoordinates = ({
    modalSize,
    monthSize,
    dayCoordinates,
    windowSize,
}: CalendarPopupCoordinates) => {
    const { left: dayLeft, top: dayTop, width: dayWidth, height: dayHeight } = dayCoordinates;

    const padding = 30;
    const diffBetweenWindowAndMonth = windowSize.x - monthSize.x;

    const initModalPositionX = dayWidth + dayLeft + diffBetweenWindowAndMonth / 2;
    const initModalPositionY = dayTop + dayHeight / 2;

    const isModalDontFitRightOfDay = initModalPositionX + modalSize.x > windowSize.x;
    const modalPositionLeftOfDay = initModalPositionX - modalSize.x - dayWidth - padding;
    const isModalDontFitLeftAndRightOfDay = isModalDontFitRightOfDay && modalPositionLeftOfDay <= 0;

    const getCoordX = () => {
        if (isModalDontFitLeftAndRightOfDay) {
            return windowSize.x / 2 - modalSize.x / 2;
        } else if (isModalDontFitRightOfDay) {
            return modalPositionLeftOfDay;
        }
        return initModalPositionX;
    };

    const getCoordY = () => {
        if (initModalPositionY + modalSize.y > windowSize.y) {
            return initModalPositionY - modalSize.y;
        } else if (isModalDontFitLeftAndRightOfDay) {
            return dayTop + dayHeight * 1.5;
        }
        return initModalPositionY;
    };

    return {
        x: getCoordX(),
        y: getCoordY(),
    };
};
