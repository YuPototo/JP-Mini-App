import { View, Button } from "@tarojs/components";
import BookList from "@/features/books/components/BookList";
import CategoryNav from "@/features/books/components/Category";
import Taro from "@tarojs/taro";
import "./index.scss";
import routes from "@/routes/routes";

export default function Index() {
    return (
        <View>
            <CategoryNav />
            <Button
                onClick={() =>
                    Taro.navigateTo({
                        url: routes.rendererExample()
                    })
                }
            >
                To Rich Text renderer
            </Button>

            <Button
                onClick={() =>
                    Taro.navigateTo({
                        url: routes.play()
                    })
                }
            >
                To Play Page
            </Button>

            <BookList />
        </View>
    );
}
