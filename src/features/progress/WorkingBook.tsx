import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import progressStorage from "./progressStorage";
import { selectBookById } from "../books/booksSlice";
import BookCard from "../books/components/BookCard";
import { navigate } from "@/utils/navigator/navigator";
import routes from "@/routes/routes";
import { View } from "@tarojs/components";

export default function WorkingBook(): JSX.Element {
    const book = useWorkingBook();

    if (!book) return <></>;

    return (
        <View
            className="mb-4 hover:cursor-pointer"
            onClick={() => navigate(routes.bookDetail(book.id))}
        >
            <View>working book</View>
            <BookCard book={book} />
        </View>
    );
}

function useWorkingBook() {
    const [workingBookId, setWorkingBookId] = useState<string | undefined>();

    useEffect(() => {
        const bookId = progressStorage.getWorkingBook();
        setWorkingBookId(bookId ? bookId : undefined);
    }, []);

    const book = useAppSelector(selectBookById(workingBookId));

    return book;
}
