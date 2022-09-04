import { View, Text, Button } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectBookById, setCurrentBookId } from "@/features/books/booksSlice";
import BookCard from "@/features/books/components/BookCard";
import Content from "@/features/books/components/Content";
import { useEffect } from "react";
import { selectIsLogin } from "@/features/user/userSlice";
import {
    useAddBookFavMutation,
    useCheckBookFavQuery,
    useRemoveBookFavMutation
} from "@/features/bookFav/bookFavService";
import Taro from "@tarojs/taro";

export default function BookDetailPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    /** tech debts
     * 不使用 as
     */
    const { bookId } = router.params as { bookId: string };

    const book = useAppSelector(selectBookById(bookId));

    useEffect(() => {
        dispatch(setCurrentBookId(bookId));
    }, [bookId, dispatch]);

    const isLogin = useAppSelector(selectIsLogin);

    const { data: isFav, isLoading } = useCheckBookFavQuery(bookId, {
        skip: !isLogin
    });

    const [addBookFav, { isLoading: isAdding }] = useAddBookFavMutation();
    const [
        removeBookFav,
        { isLoading: isRemoving }
    ] = useRemoveBookFavMutation();

    const toggleBookFav = async () => {
        // if (!isLogin) {
        //     toast.error("请登录");
        //     setTimeout(() => {
        //         naviagte(routeBuilder.login());
        //     }, 2000);
        // }

        const mutation = isFav ? removeBookFav : addBookFav;
        const toastText = isFav ? "取消收藏成功" : "收藏成功";

        try {
            await mutation(bookId).unwrap();
            Taro.showToast({ title: toastText, icon: "success" });
        } catch (err) {
            // todo: use a middleware to handle request error
            Taro.showModal({ title: "出错了", content: JSON.stringify(err) });
        }
    };

    const disableAddFav = isLoading || isAdding || isRemoving;

    const isUpdating = isAdding || isRemoving;

    return (
        <View>
            {book ? (
                <BookCard book={book} />
            ) : (
                <Text>Store 里找不到 id 为 {bookId} 的 book</Text>
            )}

            <Button onClick={toggleBookFav} disabled={disableAddFav}>
                {isFav ? "取消收藏" : "收藏"}
                {isUpdating && "中..."}
            </Button>

            <Content bookId={bookId} />
        </View>
    );
}
