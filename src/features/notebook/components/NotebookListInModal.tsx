import { updateQuestionSetFav } from "@/features/questionSet/questionSetService";
import toast from "@/utils/toast/toast";
import { View } from "@tarojs/components";
import clsx from "clsx";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
    useGetNotebooksQuery,
    useSaveQuestionSetMutation,
} from "../notebookService";
import { INotebook } from "../notebookTypes";
import { useOrderNotebooks } from "../useOrderNotebooks";
import styles from "./NotebookListInModal.module.scss";

interface Props {
    questionSetId: string;
    onQuestionSetSaved: () => void;
}

export default function NotebookListInModal({
    questionSetId,
    onQuestionSetSaved,
}: Props) {
    const { data, isLoading } = useGetNotebooksQuery(undefined);

    return (
        <View>
            {isLoading && <View>加载中...</View>}
            {data && (
                <Notebooks
                    notebooks={data}
                    questionSetId={questionSetId}
                    onQuestionSetSaved={onQuestionSetSaved}
                />
            )}
        </View>
    );
}

function Notebooks({
    notebooks,
    questionSetId,
    onQuestionSetSaved,
}: {
    notebooks: INotebook[];
    questionSetId: string;
    onQuestionSetSaved: () => void;
}) {
    const [notebookSaving, setNotebookSaving] = useState("");
    const reordered = useOrderNotebooks(notebooks);
    const newNotebookId = useAppSelector((state) => state.notebook.newNotebook);

    const dispatch = useAppDispatch();

    const [saveQuestionSet, { isLoading }] = useSaveQuestionSetMutation();
    const handleSavQuestionSet = async (notebookId: string) => {
        if (isLoading) {
            return;
        }

        try {
            setNotebookSaving(notebookId);
            await saveQuestionSet({ questionSetId, notebookId }).unwrap();
            toast.success("已收藏");
            dispatch(updateQuestionSetFav(questionSetId, true));
            onQuestionSetSaved();
        } catch (err) {
            // handled by middleware
        } finally {
            setNotebookSaving("");
        }
    };
    return (
        <View className={styles.notebooks}>
            {reordered.map((notebook) => (
                <View
                    className={clsx(styles.notebook, {
                        [`${styles["notebook-new"]}`]:
                            newNotebookId === notebook.id,
                    })}
                    key={notebook.id}
                    onClick={() => handleSavQuestionSet(notebook.id)}
                >
                    {notebook.title}

                    {isLoading && notebookSaving === notebook.id && (
                        <>{" 保存中... "}</>
                    )}
                </View>
            ))}
        </View>
    );
}
