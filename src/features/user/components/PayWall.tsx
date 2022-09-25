import ModalWall from "@/components/ModalWall/ModalWall";
import { View } from "@tarojs/components";

type Props = {
    isOpen: boolean;
};

export default function PayWall({ isOpen }: Props) {
    if (!isOpen) return <></>;
    return (
        <ModalWall onModalClosed={() => console.log("不允许关闭")}>
            <View>付费功能</View>
        </ModalWall>
    );
}
