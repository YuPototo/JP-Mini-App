import { View } from "@tarojs/components";
import BookList from "@/features/books/components/BookList";
import CategoryNav from "@/features/books/components/CategoryNav";
import WorkingBook from "@/features/progress/WorkingBook";
import { selectHasSelectedCategory } from "@/features/books/booksSlice";
import { useAppSelector } from "@/store/hooks";

export default function Index() {
    const hideWorkingBook = useAppSelector(selectHasSelectedCategory);

    return (
        <View className="page">
            <CategoryNav />
            {hideWorkingBook || <WorkingBook />}
            <BookList />
        </View>
    );
}
