import { AsyncThunkOptions, AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '..';

type AppThunkConfig = {
    state: RootState;
    dispatch: AppDispatch;
};

export const createAppThunk = <Returned, ThunkArg = void>(
    type: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, AppThunkConfig>,
    options?: AsyncThunkOptions<ThunkArg, AppThunkConfig>,
) => {
    return createAsyncThunk(type, payloadCreator, options);
};
