import { AppThunk } from "@/store/store";
import { getErrorMessage } from "@/utils/errorHandler";
import userStorage from "@/features/user/userStorage";
import Taro from "@tarojs/taro";
import { showLoginFailureModal } from "./components/showLoginFailureModal";
import { userApi } from "./userService";
import { quizChanceChangedBy, userLoggedIn, userLoggedOut } from "./userSlice";

export const getLocalUserInfo = (): AppThunk => dispatch => {
    const result = userStorage.getUserInfo();

    if (result) {
        dispatch(userLoggedIn(result));
    } else {
        dispatch(login());
    }
};

export const logout = (): AppThunk => async dispatch => {
    userStorage.removeUserInfo();
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

export const reduceQuizChance = (): AppThunk => dispatch => {
    dispatch(quizChanceChangedBy(-1));
    dispatch(userApi.endpoints.reduceQuizChance.initiate());
};
