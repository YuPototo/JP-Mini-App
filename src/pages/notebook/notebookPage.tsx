import DeleteButton from "@/features/notebook/components/NotebookDeleteButton";
import NotebookResetButton from "@/features/notebook/components/NotebookResetButton";
import {
    useGetNotebookContentQuery,
    useGetNotebooksQuery
} from "@/features/notebook/notebookService";
import {
    getNotebookProgress,
    selectNotebokProgress
} from "@/features/notebook/notebookSlice";
import routes from "@/routes/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
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
    const notebookProgress = useAppSelector(selectNotebokProgress(notebookId));

    if (!notebook) {
        return <View>加载中...</View>;
    }

    const isEmptyNotebook = questionSetIds?.length === 0;

    const notebookDoable = !isEmptyNotebook && questionSetIds !== undefined;

    const hasFinished = questionSetIds
        ? notebookProgress >= questionSetIds?.length
        : false;

    const studyProgressText = hasFinished
        ? "已完成"
        : `第${notebookProgress + 1}题`;

    const handleStart = () => {
        Taro.navigateTo({
            url: routes.practiceNotebook(notebookId, notebookProgress)
        });
    };

    return (
        <View>
            <View>{notebook.title}</View>
            {notebook.isDefault || (
                <View>
                    <Button
                        onClick={() =>
                            Taro.navigateTo({
                                url: routes.renameNotebook(notebookId)
                            })
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
                        onClick={() => Taro.switchTab({ url: routes.home() })}
                    >
                        去练习
                    </Button>
                </View>
            )}

            {notebookDoable && (
                <>
                    <View>收藏了{questionSetIds.length}题</View>

                    <View>复习进度：{studyProgressText}</View>

                    {!hasFinished && (
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
