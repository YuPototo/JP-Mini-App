import { Button, View } from "@tarojs/components";
import ModalWall from "@/components/ModalWall/ModalWall";
import routes from "@/routes/routes";
import NotebookListInModal from "./NotebookListInModal";
import { navigate } from "@/utils/navigator/navigator";
import styles from "./PickNotebookModal.module.scss";

type Props = {
    questionSetId: string;
    onModalClosed: () => void;
};

export default function PickNotebookModal({
    questionSetId,
    onModalClosed,
}: Props) {
    return (
        <ModalWall onModalClosed={onModalClosed}>
            <View className={styles.hint}>选择笔记本</View>
            <NotebookListInModal
                questionSetId={questionSetId}
                onQuestionSetSaved={onModalClosed}
            />

            <Button
                style={{ marginTop: "60rpx" }}
                className="btn btn-primary--outline"
                onClick={() => navigate(routes.createNotebook())}
            >
                创建笔记本
            </Button>
        </ModalWall>
    );
}
