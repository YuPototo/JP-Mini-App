import NotebookList from "@/features/notebook/components/NotebookListInPage";
import routes from "@/routes/routes";
import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default function notebookListPage() {
    const toCreateNotebookPage = () => {
        Taro.navigateTo({
            url: routes.createNotebook()
        });
    };
    return (
        <View>
            <Button onClick={toCreateNotebookPage}>创建笔记本</Button>
            <NotebookList />
        </View>
    );
}
