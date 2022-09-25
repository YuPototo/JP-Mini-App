import Taro from "@tarojs/taro";
import { AllProgressType } from "./progressSlice";

const setWorkingBook = (bookId: string) => {
    Taro.setStorage({
        key: "workingBookId",
        data: bookId
    });
};

const getWorkingBook = () => {
    return Taro.getStorageSync("workingBookId") as string | null;
};

const getProgressDetail = (bookId: string): AllProgressType | undefined => {
    const value = Taro.getStorageSync(`bookProgress_${bookId}`);
    if (value) {
        return JSON.parse(value);
    }
};

const setProgressDetail = (bookId: string, progressDetail: AllProgressType) => {
    Taro.setStorage({
        key: `bookProgress_${bookId}`,
        data: JSON.stringify(progressDetail)
    });
};

const progressStorage = {
    setWorkingBook,
    getWorkingBook,
    getProgressDetail,
    setProgressDetail
};

export default progressStorage;
