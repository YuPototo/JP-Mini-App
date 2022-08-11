import { View } from "@tarojs/components";
import BookList from "../../features/books/components/BookList";
import CategoryNav from "../../features/books/components/Category";
import "./index.scss";

export default function Index() {
    return (
        <View>
            <CategoryNav />
            <BookList />
        </View>
    );
}
