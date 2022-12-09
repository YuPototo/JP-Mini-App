import IconFont from "@/components/iconfont";
import { updateQuestionSetFav } from "@/features/questionSet/questionSetService";
import toast from "@/utils/toast/toast";
import { View } from "@tarojs/components";
import { useState } from "react";

import { useAppDispatch } from "../../../store/hooks";
import { useDeleteQuestionSetMutation } from "../notebookService";
import PickNotebookModal from "./PickNotebookModal";
import styles from "./FavButton.module.scss";

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
        <View>
            {showModal && (
                <PickNotebookModal
                    onModalClosed={() => setShowModal(false)}
                    questionSetId={questionSetId}
                />
            )}
            {isFav ? (
                <View
                    className={styles.btnWrapper}
                    onClick={handleUnsaveQuestionSet}
                >
                    <IconFont name="star-fill" size={60} color={"#ffd700"} />
                </View>
            ) : (
                <View
                    className={styles.btnWrapper}
                    onClick={() => setShowModal(true)}
                >
                    <IconFont name="star" size={60} color={"#ffd700"} />
                </View>
            )}
        </View>
    );
}
