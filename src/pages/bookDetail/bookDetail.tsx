import { View, Text } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    selectBookById,
    setCurrentBookId
} from "../../features/books/booksSlice";
import BookCard from "../../features/books/components/BookCard";
import Content from "../../features/books/components/Content";
import { useEffect } from "react";

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

    return (
        <View>
            {book ? (
                <BookCard book={book} />
            ) : (
                <Text>Store 里找不到 id 为 {bookId} 的 book</Text>
            )}

            <Content bookId={bookId} />
        </View>
    );
}
