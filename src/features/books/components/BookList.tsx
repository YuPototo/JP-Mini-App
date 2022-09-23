import { View } from "@tarojs/components";
import { useAppSelector } from "@/store/hooks";
import BookCard from "./BookCard";
import { useGetBooksQuery } from "../booksService";
import { selectBooksByCategory } from "../booksSlice";
import routes from "@/routes/routes";
import { navigate } from "@/utils/navigator/navigator";

export default function BookList() {
    useGetBooksQuery();
    const books = useAppSelector(selectBooksByCategory);

    return (
        <View>
            {books.length > 0 ? (
                books.map(book => (
                    <View
                        key={book.id}
                        onClick={() => navigate(routes.bookDetail(book.id))}
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
