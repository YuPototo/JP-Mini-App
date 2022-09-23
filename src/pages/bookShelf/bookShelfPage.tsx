import { useGetBookFavsQuery } from "@/features/bookFav/bookFavService";
import { selectBookById } from "@/features/books/booksSlice";
import BookCard from "@/features/books/components/BookCard";
import { selectIsLogin } from "@/features/user/userSlice";
import routes from "@/routes/routes";
import { useAppSelector } from "@/store/hooks";
import { navigate } from "@/utils/navigator/navigator";
import { Button, View } from "@tarojs/components";

export default function bookShelf() {
    const isLogin = useAppSelector(selectIsLogin);

    const { data } = useGetBookFavsQuery(undefined, { skip: !isLogin });

    return (
        <View>
            {data?.map(bookId => (
                <View
                    key={bookId}
                    onClick={() => navigate(routes.bookDetail(bookId))}
                >
                    <BookWrapper bookId={bookId} />
                </View>
            ))}

            {data?.length === 0 && (
                <>
                    <View>暂无收藏的练习册</View>
                    <Button
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
