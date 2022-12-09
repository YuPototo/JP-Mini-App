import { View } from "@tarojs/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BookCard from "./BookCard";
import { useGetBooksQuery } from "../booksService";
import { cleanCategory, selectBooksByCategory } from "../booksSlice";
import routes from "@/routes/routes";
import { navigate } from "@/utils/navigator/navigator";
import styles from "./BookList.module.scss";
import BookCardSkeleton from "./BookCardSkeleton";

export default function BookList() {
    const { isLoading } = useGetBooksQuery();
    const dispatch = useAppDispatch();
    const books = useAppSelector(selectBooksByCategory);

    const handleRepick = () => {
        dispatch(cleanCategory());
    };

    if (isLoading) {
        return (
            <View className={styles.bookList}>
                <BookCardSkeleton />
                <BookCardSkeleton />
                <BookCardSkeleton />
                <BookCardSkeleton />
            </View>
        );
    }

    return (
        <View className={styles.bookList}>
            {books.length > 0 ? (
                books.map((book) => (
                    <View
                        key={book.id}
                        onClick={() => navigate(routes.bookDetail(book.id))}
                    >
                        <BookCard book={book} />
                    </View>
                ))
            ) : (
                <View className={styles.noBookHintWrapper}>
                    <View className={styles.noBookHint}>
                        没有符合该筛选条件的练习册
                    </View>
                    <View
                        className="btn btn-primary--outline"
                        onClick={handleRepick}
                    >
                        重新选择
                    </View>
                </View>
            )}
        </View>
    );
}
