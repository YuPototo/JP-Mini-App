import NotebookList from "@/features/notebook/components/NotebookListInPage";
import routes from "@/routes/routes";
import { navigate } from "@/utils/navigator/navigator";
import { Button, View } from "@tarojs/components";

export default function notebookListPage() {
    const toCreateNotebookPage = () => {
        navigate(routes.createNotebook());
    };
    return (
        <View>
            <Button onClick={toCreateNotebookPage}>创建笔记本</Button>
            <NotebookList />
        </View>
    );
}
