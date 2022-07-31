import { View } from "@tarojs/components";
import { useAppSelector } from "../../store/hooks";
import { useGetBooksQuery } from "./booksService";
import { selectBooksByCategory } from "./booksSlice";

export default function BookList() {
    useGetBooksQuery();
    const books = useAppSelector(selectBooksByCategory);

    return (
        <View>
            <View>book list</View>
            {books.length > 0 ? (
                books.map((book, index) => (
                    <View className="m-4" key={index}>
                        {book.title}
                    </View>
                ))
            ) : (
                <View>No books</View>
            )}
        </View>
    );
}
