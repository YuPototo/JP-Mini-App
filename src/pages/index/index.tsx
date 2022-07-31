import { View } from "@tarojs/components";
import BookList from "../../features/books/BookList";
import CategoryNav from "../../features/books/Category";
import "./index.scss";

export default function Index() {
    return (
        <View>
            <CategoryNav />
            <BookList />
        </View>
    );
}
