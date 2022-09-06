import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";
import { RootState } from "../store";

export const queryErrorMiddleware: Middleware<
    {},
    RootState
> = () => next => action => {
    const isCreatedByAsyncThunk = isRejectedWithValue()(action);

    if (!isCreatedByAsyncThunk) {
        return next(action);
    }

    const { payload } = action;

    /*
     * Tech debt
     * Action type is not corretely infered
     */
    //@ts-ignore
    if (payload.status === 401) {
        return next(action);
    }

    //@ts-ignore
    const hasData = "data" in payload;
    let errMsg: string;
    if (hasData) {
        //@ts-ignore
        errMsg = payload.data.message ?? JSON.stringify(payload.data);
    } else {
        errMsg =
            //@ts-ignore
            "error" in payload ? payload.error : JSON.stringify(payload);
    }

    Taro.showModal({
        title: "出错了",
        content: errMsg,
        showCancel: false
    });

    return next(action);
};
