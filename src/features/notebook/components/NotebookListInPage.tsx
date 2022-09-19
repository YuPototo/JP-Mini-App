import { View } from "@tarojs/components";
import { useAppSelector } from "../../../store/hooks";
import { selectIsLogin } from "../../user/userSlice";
import { useGetNotebooksQuery } from "../notebookService";
import { INotebook } from "../notebookTypes";
import { useOrderNotebooks } from "../useOrderNotebooks";

export default function NotebookList() {
    const isLogin = useAppSelector(selectIsLogin);

    const { data, isLoading } = useGetNotebooksQuery(undefined, {
        skip: !isLogin
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
    const newNotebookId = useAppSelector(state => state.notebook.newNotebook);

    const handleToNotebook = (notebookId: string) => {
        console.log(`to notebook :${notebookId}`);
    };

    return (
        <View>
            {reordered.map(notebook => (
                <View
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
