import DeleteButton from "@/features/notebook/components/NotebookDeleteButton";
import NotebookResetButton from "@/features/notebook/components/NotebookResetButton";
import {
    useGetNotebookContentQuery,
    useGetNotebooksQuery,
} from "@/features/notebook/notebookService";
import {
    getNotebookProgress,
    selectNotebokProgressIndex,
} from "@/features/notebook/notebookSlice";
import routes from "@/routes/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { navigate } from "@/utils/navigator/navigator";
import { Button, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";
import styles from "./notebookPage.module.scss";

export default function notebookPage() {
    const router = useRouter();
    const { notebookId } = router.params as { notebookId: string };
    const dispatch = useAppDispatch();

    const { data: notebooks } = useGetNotebooksQuery(undefined);

    const { data: questionSetIds } = useGetNotebookContentQuery(notebookId);

    useEffect(() => {
        dispatch(getNotebookProgress(notebookId));
    }, [notebookId, dispatch]);

    const notebook = notebooks?.find((el) => el.id === notebookId);
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

    const progressInPercent = Math.floor(progress * 100) + "%";

    return (
        <View className="page">
            <View className={styles.heading}>{notebook.title}</View>
            {notebook.isDefault || (
                <View className={styles.btnWrapper}>
                    <Button
                        className="btn btn-secondary--outline"
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
                <View className={styles.emptyNotebookWrapper}>
                    <View className={styles.hint}>这个笔记本是空的</View>
                    <Button
                        className="btn btn-primary--outline"
                        onClick={() => navigate(-1)}
                    >
                        返回
                    </Button>
                </View>
            )}

            {notebookDoable && (
                <View className={styles.mainContent}>
                    <View className={styles.count}>
                        题目数量：{questionSetIds.length}
                    </View>

                    <View className={styles.progress}>
                        复习进度：{progressInPercent}
                    </View>

                    {notebookProgress > 0 && (
                        <View className={styles.resetButton}>
                            <NotebookResetButton notebook={notebook} />
                        </View>
                    )}

                    {progress < 1 && (
                        <View className={styles.pracitceBtn}>
                            <Button
                                className="btn btn-primary"
                                onClick={handleStart}
                            >
                                {notebookProgress > 0 ? "继续" : "开始"}复习
                            </Button>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}
