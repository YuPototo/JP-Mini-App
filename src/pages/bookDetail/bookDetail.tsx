import { View, Text } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useAppSelector } from "../../store/hooks";
import { selectBookById } from "../../features/books/booksSlice";
import BookCard from "../../features/books/components/BookCard";
import Content from "../../features/books/components/Content";

export default function BookDetailPage() {
    const router = useRouter();

    const { bookId } = router.params;

    const book = useAppSelector(selectBookById(bookId));

    if (!bookId) {
        return (
            <View>
                <Text>BookId 参数为空</Text>
            </View>
        );
    }

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
