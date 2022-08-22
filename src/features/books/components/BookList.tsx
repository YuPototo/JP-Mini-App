import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useAppSelector } from "@/store/hooks";
import BookCard from "./BookCard";
import { useGetBooksQuery } from "../booksService";
import { selectBooksByCategory } from "../booksSlice";
import routes from "@/routes/routes";

export default function BookList() {
    useGetBooksQuery();
    const books = useAppSelector(selectBooksByCategory);

    return (
        <View>
            {books.length > 0 ? (
                books.map(book => (
                    <View
                        key={book.id}
                        onClick={() =>
                            Taro.navigateTo({
                                url: routes.bookDetail(book.id)
                            })
                        }
                    >
                        <BookCard book={book} />
                    </View>
                ))
            ) : (
                <View>No books</View>
            )}
        </View>
    );
}
