import Taro from "@tarojs/taro";
import { ProgressDetail } from "./progressSlice";

const setWorkingBook = (bookId: string) => {
    Taro.setStorage({
        key: "workingBookId",
        data: bookId
    });
};

const getWorkingBook = () => {
    return Taro.getStorageSync("workingBookId") as string | null;
};

const getProgressDetail = (
    bookId: string
): ProgressDetail | undefined | { isDone: true } => {
    const value = Taro.getStorageSync(`bookProgress_${bookId}`);
    if (value) {
        return JSON.parse(value);
    }
};

const setProgressDetail = (
    bookId: string,
    progressDetail: ProgressDetail | 1
) => {
    if (progressDetail === 1) {
        Taro.setStorage({
            key: `bookProgress_${bookId}`,
            data: JSON.stringify({ isDone: true })
        });
    } else {
        Taro.setStorage({
            key: `bookProgress_${bookId}`,
            data: JSON.stringify(progressDetail)
        });
    }
};

const progressStorage = {
    setWorkingBook,
    getWorkingBook,
    getProgressDetail,
    setProgressDetail
};

export default progressStorage;
