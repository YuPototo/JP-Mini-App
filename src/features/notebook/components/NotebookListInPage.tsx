import routes from "@/routes/routes";
import { navigate } from "@/utils/navigator/navigator";
import { View } from "@tarojs/components";
import { useAppSelector } from "../../../store/hooks";
import { selectIsLogin } from "../../user/userSlice";
import { useGetNotebooksQuery } from "../notebookService";
import { INotebook } from "../notebookTypes";
import { useOrderNotebooks } from "../useOrderNotebooks";
import styles from "./NotebookListInPage.module.scss";

export default function NotebookListInPage() {
    const isLogin = useAppSelector(selectIsLogin);

    const { data, isLoading } = useGetNotebooksQuery(undefined, {
        skip: !isLogin,
    });

    return (
        <View>
            {isLoading && <View>加载中...</View>}
            {data && <Notebooks notebooks={data} />}
        </View>
    );
}

function Notebooks({ notebooks }: { notebooks: INotebook[] }) {
    const reordered = useOrderNotebooks(notebooks);
    const newNotebookId = useAppSelector((state) => state.notebook.newNotebook);

    const handleToNotebook = (notebookId: string) => {
        navigate(routes.notebookPage(notebookId));
    };

    return (
        <View>
            {reordered.map((notebook) => (
                <View
                    className={styles.notebook}
                    key={notebook.id}
                    onClick={() => handleToNotebook(notebook.id)}
                >
                    {notebook.title}
                    {newNotebookId === notebook.id ? "  最新" : ""}
                </View>
            ))}
        </View>
    );
}
