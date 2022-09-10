import { AppThunk } from "@/store/store";
import { getErrorMessage } from "@/utils/errorHandler";
import storageService from "@/utils/storageService";
import Taro from "@tarojs/taro";
import { showLoginFailureModal } from "./showLoginFailureModal";
import { userApi } from "./userService";
import { userLoggedIn, userLoggedOut } from "./userSlice";

export const getLocalUserInfo = (): AppThunk => dispatch => {
    const result = storageService.getUserInfo();

    if (result) {
        dispatch(userLoggedIn(result));
    } else {
        dispatch(login());
    }
};

export const logout = (): AppThunk => async dispatch => {
    storageService.removeUserInfo();
    dispatch(userLoggedOut());
};

export const login = (): AppThunk => async dispatch => {
    let code: string;
    try {
        const res = await Taro.login();
        code = res.code;
    } catch (err) {
        const message = `请求微信登录code错误:${getErrorMessage(err)}`;
        console.error(message);
        showLoginFailureModal(message, () => dispatch(login()));
        return;
    }

    await dispatch(userApi.endpoints.login.initiate(code));
};
