import { View } from "@tarojs/components";
import { useAppSelector } from "../../store/hooks";
import BookCard from "./BookCard";
import { useGetBooksQuery } from "./booksService";
import { selectBooksByCategory } from "./booksSlice";

export default function BookList() {
    useGetBooksQuery();
    const books = useAppSelector(selectBooksByCategory);

    return (
        <View>
            {books.length > 0 ? (
                books.map((book, index) => <BookCard key={index} book={book} />)
            ) : (
                <View>No books</View>
            )}
        </View>
    );
}
