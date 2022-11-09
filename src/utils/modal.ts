import { Coordinates } from '@/types/modal';

type DayCoordinates = {
    left: number;
    top: number;
} & Coordinates;

type CalendarPopupCoordinates = {
    monthSize: Coordinates;
    modalSize: Coordinates;
    dayCoordinates: DayCoordinates;
    windowSize: Coordinates;
};

export const getCalendarPopupCoordinates = (coordinates: CalendarPopupCoordinates) => {
    const { modalSize, monthSize, dayCoordinates, windowSize } = coordinates;
    const padding = 30;
    const diffX = windowSize.x - monthSize.x;

    const posX = dayCoordinates.x + dayCoordinates.left + diffX / 2;
    const posY = dayCoordinates.top + dayCoordinates.y / 2;

    const getCoordX = () => {
        if (posX + modalSize.x > windowSize.x && posX - modalSize.x - dayCoordinates.x - padding <= 0) {
            return windowSize.x / 2 - modalSize.x / 2;
        } else if (posX + modalSize.x > windowSize.x) {
            return posX - modalSize.x - dayCoordinates.x - padding;
        }
        return posX;
    };

    const getCoordY = () => {
        if (posY + modalSize.y > windowSize.y) {
            return posY - modalSize.y;
        } else {
            if (posX + modalSize.x > windowSize.x && posX - modalSize.x - dayCoordinates.x - padding <= 0) {
                return dayCoordinates.top + dayCoordinates.y * 1.5;
            } else {
                return posY;
            }
        }
    };

    return {
        x: getCoordX(),
        y: getCoordY(),
    };
};
