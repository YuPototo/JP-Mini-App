import { useGetParameterQuery } from "@/features/parameter/parameterService";
import routes from "@/routes/routes";
import { useAppSelector } from "@/store/hooks";
import { navigate } from "@/utils/navigator/navigator";
import toast from "@/utils/toast/toast";
import { View, Image, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import styles from "./pdfShare.module.scss";

export default function pdfShare() {
    const isMember = useAppSelector((state) => state.user.isMember);

    const { data: pdfImage } = useGetParameterQuery("pdfImage");
    const { data: baiduPanURL } = useGetParameterQuery("baiduPanURL");
    const { data: baiduPanCode } = useGetParameterQuery("baiduPanCode");

    const copyURL = () => {
        if (!baiduPanURL) return;
        Taro.setClipboardData({
            data: baiduPanURL.value as string,
            success: () => {
                toast.success("复制成功");
            },
        });
    };

    return (
        <View className="page">
            <View className={styles.topTitle}>
                <View>获取N1到N3真题</View>
                <View>2010年至今</View>
            </View>
            <View className={styles.imageWrapper}>
                {pdfImage && (
                    <Image
                        src={pdfImage.value as string}
                        className={styles.image}
                        mode="aspectFit"
                    />
                )}
            </View>

            <View className={styles.part}>
                <Text className={styles.label}>网盘地址</Text>
                <Text className={styles.content}>{baiduPanURL?.value}</Text>
            </View>
            <View className={styles.part}>
                <Text className={styles.label}>提取码</Text>
                <Text className={styles.content}>
                    {isMember ? baiduPanCode?.value : "????"}
                </Text>
            </View>

            {isMember ? (
                <View className="btn btn-primary--outline" onClick={copyURL}>
                    复制网盘地址
                </View>
            ) : (
                <View
                    className="btn btn-primary--outline"
                    onClick={() => navigate(routes.memberLanding())}
                >
                    成为会员，获得提取码
                </View>
            )}

            <View className={styles.contactPart}>
                <View className={styles.contactCopy}>
                    如果网盘到期，请联系开发者。
                </View>
                <Button
                    className="btn btn-secondary--outline"
                    hover-class="none"
                    open-type="contact"
                >
                    联系开发者
                </Button>
            </View>
        </View>
    );
}
