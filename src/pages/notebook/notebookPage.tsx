import DeleteButton from "@/features/notebook/components/NotebookDeleteButton";
import NotebookResetButton from "@/features/notebook/components/NotebookResetButton";
import {
    useGetNotebookContentQuery,
    useGetNotebooksQuery
} from "@/features/notebook/notebookService";
import {
    getNotebookProgress,
    selectNotebokProgressIndex
} from "@/features/notebook/notebookSlice";
import routes from "@/routes/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { navigate } from "@/utils/navigator/navigator";
import { Button, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";

export default function notebookPage() {
    const router = useRouter();
    const { notebookId } = router.params as { notebookId: string };
    const dispatch = useAppDispatch();

    const { data: notebooks } = useGetNotebooksQuery(undefined);

    const { data: questionSetIds } = useGetNotebookContentQuery(notebookId);

    useEffect(() => {
        dispatch(getNotebookProgress(notebookId));
    }, [notebookId, dispatch]);

    const notebook = notebooks?.find(el => el.id === notebookId);
    const notebookProgress = useAppSelector(selectNotebokProgressIndex);

    if (!notebook) {
        return <View>加载中...</View>;
    }

    const isEmptyNotebook = questionSetIds?.length === 0;

    const notebookDoable = !isEmptyNotebook && questionSetIds !== undefined;

    const progress = questionSetIds
        ? notebookProgress / questionSetIds.length
        : 0;

    const handleStart = () => {
        navigate(routes.practiceNotebook(notebookId, notebookProgress));
    };

    return (
        <View>
            <View>{notebook.title}</View>
            {notebook.isDefault || (
                <View>
                    <Button
                        onClick={() =>
                            navigate(routes.renameNotebook(notebookId))
                        }
                    >
                        改名
                    </Button>
                    <DeleteButton notebook={notebook} />
                </View>
            )}

            {isEmptyNotebook && (
                <View>
                    <View>这个笔记本是空的</View>
                    <Button
                        onClick={() =>
                            navigate(routes.home(), { method: "switchTab" })
                        }
                    >
                        去练习
                    </Button>
                </View>
            )}

            {notebookDoable && (
                <>
                    <View>收藏了{questionSetIds.length}题</View>

                    <View>复习进度：{progress}</View>

                    {progress < 1 && (
                        <View>
                            <Button onClick={handleStart}>
                                {notebookProgress > 0 ? "继续" : "开始"}复习
                            </Button>
                        </View>
                    )}

                    {notebookProgress > 0 && (
                        <View>
                            <NotebookResetButton notebook={notebook} />
                        </View>
                    )}
                </>
            )}
        </View>
    );
}
