import { useGetBookFavsQuery } from "@/features/bookFav/bookFavService";
import { selectBookById } from "@/features/books/booksSlice";
import BookCard from "@/features/books/components/BookCard";
import { selectIsLogin } from "@/features/user/userSlice";
import routes from "@/routes/routes";
import { useAppSelector } from "@/store/hooks";
import { navigate } from "@/utils/navigator/navigator";
import { Button, View } from "@tarojs/components";
import styles from "./bookShelfPage.module.scss";
import WorkingBook from "@/features/progress/WorkingBook";

export default function bookShelf() {
    const isLogin = useAppSelector(selectIsLogin);

    const { data } = useGetBookFavsQuery(undefined, { skip: !isLogin });

    return (
        <View className="page">
            <View className={styles.workingBookWrapper}>
                <WorkingBook />
            </View>
            <View className={styles.bookList}>
                {data?.map((bookId) => (
                    <View
                        key={bookId}
                        onClick={() => navigate(routes.bookDetail(bookId))}
                    >
                        <BookWrapper bookId={bookId} />
                    </View>
                ))}
            </View>

            {data?.length === 0 && (
                <>
                    <View className={styles.noFavHint}>你还没有收藏练习</View>
                    <Button
                        className="btn btn-primary"
                        onClick={() =>
                            navigate(routes.home(), { method: "switchTab" })
                        }
                    >
                        浏览练习册
                    </Button>
                </>
            )}
        </View>
    );
}

function BookWrapper({ bookId }: { bookId: string }) {
    const book = useAppSelector(selectBookById(bookId));
    if (!book) {
        return <div>错误：找不到练习册 {bookId}</div>;
    }
    return <BookCard book={book} />;
}
