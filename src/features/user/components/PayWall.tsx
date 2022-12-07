import ModalWall from "@/components/ModalWall/ModalWall";
import { useRewardAd } from "@/features/adReward/useRewardAd";
import routes from "@/routes/routes";
import { navigate } from "@/utils/navigator/navigator";
import { View } from "@tarojs/components";

export default function PayWall() {
    const showAd = useRewardAd();

    return (
        <ModalWall
            onModalClosed={() => console.log("不允许关闭")}
            showCloseBttuon={false}
        >
            <View style={{ marginBottom: "30rpx" }}>没有做题机会啦</View>
            <View style={{ marginBottom: "40rpx" }}>
                成为会员，可以无限做题
            </View>

            <View
                className={"btn btn-primary"}
                style={{ marginBottom: "30rpx" }}
                onClick={() => navigate(routes.memberLanding())}
            >
                成为会员
            </View>
            <View className={"btn btn-primary--outline"} onClick={showAd}>
                看广告
            </View>
        </ModalWall>
    );
}
