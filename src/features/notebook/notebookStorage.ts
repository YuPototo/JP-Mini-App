import Taro from "@tarojs/taro";

const setProgress = (notebookId: string, index: number) => {
    Taro.setStorage({ key: `notebook_${notebookId}`, data: index.toString() });
};

const getProgress = (notebookId: string) => {
    const progressIndex = Taro.getStorageSync(`notebook_${notebookId}`);
    return progressIndex ? parseInt(progressIndex) : 0;
};

const notebookStorageService = {
    setProgress,
    getProgress
};

export default notebookStorageService;
