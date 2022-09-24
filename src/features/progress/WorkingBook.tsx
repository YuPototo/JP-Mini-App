import BookCard from "../books/components/BookCard";
import { navigate } from "@/utils/navigator/navigator";
import routes from "@/routes/routes";
import { View } from "@tarojs/components";
import { useWorkingBook } from "./hooks/useWorkingBook";

export default function WorkingBook(): JSX.Element {
    const {
        book,
        isDone,
        sectionTitle,
        chapterTitle,
        questionSetIndex
    } = useWorkingBook();

    if (!book) return <></>;

    return (
        <View
            className="mb-4 hover:cursor-pointer"
            onClick={() => navigate(routes.bookDetail(book.id))}
        >
            <View>working book</View>
            <BookCard book={book} />
            {isDone ? (
                <View>这本书做完了</View>
            ) : (
                <View>
                    <View>{sectionTitle}</View>
                    <View>{chapterTitle}</View>
                    {questionSetIndex !== undefined && (
                        <View>第{questionSetIndex + 1}题</View>
                    )}
                </View>
            )}
        </View>
    );
}
