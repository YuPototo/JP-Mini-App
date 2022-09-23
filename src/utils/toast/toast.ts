import Taro from "@tarojs/taro";

/**
 * @param {string} message: 最多7个汉字长度
 */
function success(message: string) {
    Taro.showToast({
        title: message,
        icon: "success"
    });
}

/**
 * @param {string} message: 最多7个汉字长度
 */
function error(message: string) {
    Taro.showToast({
        title: message,
        icon: "none"
    });
}

/**
 *
 */
function loading(message?: string) {
    const option = message ? { title: message } : undefined;
    Taro.showLoading(option);
}

/**
 * 隐藏 loading 提示框
 */
function hideLoading() {
    Taro.hideLoading();
}

const toast = {
    success,
    error,
    loading,
    hideLoading
};

export default toast;
