import { loginThunk, logoutThunk } from "@/features/user/userSlice";
import {
    MiddlewareAPI,
    isRejectedWithValue,
    Middleware
} from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";

export const authRejectionMiddleware: Middleware = (
    api: MiddlewareAPI
) => next => action => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
        // 技术债。dispatch 应该是个支持使用 thunk 的 dispatch，但 ts 在这里获取到的是个不能使用 thunk 的 dispatch
        const { dispatch } = api as any;

        // 第1步：登出
        dispatch(logoutThunk());

        // 第2步：重新登陆
        dispatch(loginThunk());

        // 第2步：引导用户重新启动 App
        Taro.showModal({
            title: "正在登录",
            content: "点击确认以继续",
            showCancel: false
        });
    }

    return next(action);
};
