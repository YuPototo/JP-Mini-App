import ModalWall from "@/components/ModalWall/ModalWall";
import { useRewardAd } from "@/features/adReward/useRewardAd";
import { Button, View } from "@tarojs/components";

export default function PayWall() {
    const showAd = useRewardAd();

    return (
        <ModalWall onModalClosed={() => console.log("不允许关闭")}>
            <View>付费功能</View>

            <Button onClick={showAd}>看广告</Button>
        </ModalWall>
    );
}
