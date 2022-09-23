import { updateQuestionSetFav } from "@/features/questionSet/questionSetService";
import toast from "@/utils/toast/toast";
import { View } from "@tarojs/components";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
    useGetNotebooksQuery,
    useSaveQuestionSetMutation
} from "../notebookService";
import { INotebook } from "../notebookTypes";
import { useOrderNotebooks } from "../useOrderNotebooks";

interface Props {
    questionSetId: string;
    onQuestionSetSaved: () => void;
}

export default function NotebookListInModal({
    questionSetId,
    onQuestionSetSaved
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
    onQuestionSetSaved
}: {
    notebooks: INotebook[];
    questionSetId: string;
    onQuestionSetSaved: () => void;
}) {
    const [notebookSaving, setNotebookSaving] = useState("");
    const reordered = useOrderNotebooks(notebooks);
    const newNotebookId = useAppSelector(state => state.notebook.newNotebook);

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
        <View>
            {reordered.map(notebook => (
                <View
                    style={{ padding: "20px" }}
                    key={notebook.id}
                    onClick={() => handleSavQuestionSet(notebook.id)}
                >
                    {notebook.title}{" "}
                    {newNotebookId === notebook.id ? "  最新" : ""}
                    {isLoading && notebookSaving === notebook.id && (
                        <>{" 保存中... "}</>
                    )}
                </View>
            ))}
        </View>
    );
}
