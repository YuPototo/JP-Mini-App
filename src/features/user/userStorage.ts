import Taro from "@tarojs/taro";

const setUserInfo = (token: string, displayId: string) => {
    Taro.setStorage({ key: "token", data: token });
    Taro.setStorage({ key: "displayId", data: displayId });
};

const getUserInfo = () => {
    const token = Taro.getStorageSync("token");
    const displayId = Taro.getStorageSync("displayId");
    if (!token || !displayId) return;
    return { token, displayId };
};

const removeUserInfo = () => {
    Taro.removeStorage({ key: "token" });
    Taro.removeStorage({ key: "displayId" });
};

const userStorage = {
    setUserInfo,
    getUserInfo,
    removeUserInfo
};

export default userStorage;
