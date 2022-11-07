import { RootState } from './../index';

export const selectMonthIndex = ({ month: { monthIndex } }: RootState) => monthIndex;
