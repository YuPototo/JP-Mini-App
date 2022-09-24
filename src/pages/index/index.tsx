import { View, Button } from "@tarojs/components";
import BookList from "@/features/books/components/BookList";
import CategoryNav from "@/features/books/components/Category";
import "./index.scss";
import routes from "@/routes/routes";
import { navigate } from "@/utils/navigator/navigator";
import WorkingBook from "@/features/progress/WorkingBook";

export default function Index() {
    return (
        <View>
            <CategoryNav />
            <WorkingBook />

            <Button onClick={() => navigate(routes.rendererExample())}>
                To Rich Text renderer
            </Button>

            <Button onClick={() => navigate(routes.play())}>
                To Play Page
            </Button>

            <BookList />
        </View>
    );
}
