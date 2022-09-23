import Taro from "@tarojs/taro";

const setProgress = (notebookId: string, progress: string | 0 | 1) => {
    let value = typeof progress === "string" ? progress : progress.toString();
    Taro.setStorage({ key: `notebook_${notebookId}`, data: value });
};

const getProgress = (notebookId: string) => {
    const value = Taro.getStorageSync(`notebook_${notebookId}`);
    if (!value) {
        return 0;
    }

    const intValue = parseInt(value);
    if (intValue === 0 || intValue === 1) {
        return intValue;
    } else {
        return value;
    }
};

const notebookStorageService = {
    setProgress,
    getProgress
};

export default notebookStorageService;
