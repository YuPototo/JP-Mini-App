import Taro from "@tarojs/taro";

const setWorkingBook = (bookId: string) => {
    Taro.setStorage({
        key: "workingBookId",
        data: bookId
    });
};

const getWorkingBook = () => {
    return Taro.getStorageSync("workingBookId") as string | null;
};

const progressStorage = {
    setWorkingBook,
    getWorkingBook
};

export default progressStorage;
