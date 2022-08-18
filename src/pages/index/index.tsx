import { View, Button } from "@tarojs/components";
import BookList from "../../features/books/components/BookList";
import CategoryNav from "../../features/books/components/Category";
import Taro from "@tarojs/taro";
import "./index.scss";
import pageNames from "../../routes";

export default function Index() {
    return (
        <View>
            <CategoryNav />
            <Button
                onClick={() =>
                    Taro.navigateTo({
                        url: pageNames.rendererExample
                    })
                }
            >
                To renderer
            </Button>
            <BookList />
        </View>
    );
}
