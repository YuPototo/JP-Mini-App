import { Button, View } from "@tarojs/components";
import ModalWall from "@/components/ModalWall/ModalWall";
import routes from "@/routes/routes";
import NotebookListInModal from "./NotebookListInModal";
import { navigate } from "@/utils/navigator/navigator";

type Props = {
    questionSetId: string;
    onModalClosed: () => void;
};

export default function PickNotebookModal({
    questionSetId,
    onModalClosed
}: Props) {
    return (
        <ModalWall onModalClosed={onModalClosed}>
            <View>选择笔记本</View>
            <NotebookListInModal
                questionSetId={questionSetId}
                onQuestionSetSaved={onModalClosed}
            />
            <Button onClick={() => navigate(routes.createNotebook())}>
                创建笔记本
            </Button>
        </ModalWall>
    );
}
