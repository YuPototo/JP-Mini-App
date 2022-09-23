import { Button, View } from "@tarojs/components";
import ModalWall from "@/components/ModalWall/ModalWall";
import Taro from "@tarojs/taro";
import routes from "@/routes/routes";
import NotebookListInModal from "./NotebookListInModal";

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
            <Button
                onClick={() =>
                    Taro.navigateTo({ url: routes.createNotebook() })
                }
            >
                创建笔记本
            </Button>
        </ModalWall>
    );
}
