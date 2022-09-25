import Taro from "@tarojs/taro";

export const showLoginFailureModal = (
    message: string,
    onConfirm: () => void
) => {
    Taro.showModal({
        title: "登录失败",
        content: message,
        confirmText: "再次登陆",
        success: function(res) {
            if (res.confirm) {
                onConfirm();
            } else if (res.cancel) {
                console.log("用户点击取消");
            }
        }
    });
};
