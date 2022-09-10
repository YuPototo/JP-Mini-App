import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { logout, login } from "@/features/user/userThunks";

import Taro from "@tarojs/taro";

export const authRejectionMiddleware: Middleware<
    {},
    RootState
> = storeApi => next => action => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
        // 第1步：登出
        // @ts-ignore
        storeApi.dispatch(logout());

        // 第2步：重新登陆
        // @ts-ignore
        storeApi.dispatch(login());

        // 第2步：引导用户重新启动 App
        Taro.showModal({
            title: "正在登录",
            content: "点击确认以继续",
            showCancel: false
        });
    }

    return next(action);
};
