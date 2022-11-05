import { View } from "@tarojs/components";
import BookList from "@/features/books/components/BookList";
import CategoryNav from "@/features/books/components/CategoryNav";
import "./index.scss";
import WorkingBook from "@/features/progress/WorkingBook";

export default function Index() {
    return (
        <View className="page">
            <CategoryNav />
            <WorkingBook />

            <BookList />

            {/* <Button onClick={() => navigate(routes.rendererExample())}>
                To Rich Text renderer
            </Button>

            <Button onClick={() => navigate(routes.play())}>
                To Play Page
            </Button> */}
        </View>
    );
}
