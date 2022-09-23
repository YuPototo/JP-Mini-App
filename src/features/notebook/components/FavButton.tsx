import { updateQuestionSetFav } from "@/features/questionSet/questionSetService";
import toast from "@/utils/toast/toast";
import { Button } from "@tarojs/components";
import { useState } from "react";

import { useAppDispatch } from "../../../store/hooks";
import { useDeleteQuestionSetMutation } from "../notebookService";
import PickNotebookModal from "./PickNotebookModal";

interface Props {
    questionSetId: string;
    isFav?: boolean;
}
export default function FavButton({ isFav, questionSetId }: Props) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();

    const [unsaveQuestionSet, { isLoading }] = useDeleteQuestionSetMutation();

    const handleUnsaveQuestionSet = async () => {
        if (isLoading) return;

        try {
            await unsaveQuestionSet(questionSetId).unwrap();
            toast.success("已取消收藏");
            dispatch(updateQuestionSetFav(questionSetId, false));
        } catch (err) {
            // middleware 已经处理
        }
    };

    return (
        <>
            {showModal && (
                <PickNotebookModal
                    onModalClosed={() => setShowModal(false)}
                    questionSetId={questionSetId}
                />
            )}
            {isFav ? (
                <Button onClick={handleUnsaveQuestionSet}>
                    取消收藏{isLoading ? "..." : ""}
                </Button>
            ) : (
                <Button onClick={() => setShowModal(true)}>收藏</Button>
            )}
        </>
    );
}
