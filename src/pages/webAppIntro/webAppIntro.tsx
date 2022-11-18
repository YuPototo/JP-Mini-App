import IconFont from "@/components/iconfont";
import { useGetParameterQuery } from "@/features/parameter/parameterService";
import toast from "@/utils/toast/toast";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import styles from "./webAppIntro.module.scss";

export default function WebAppIntro() {
    const { data: webAppImage } = useGetParameterQuery("webAppImage");

    const copyURL = () => {
        Taro.setClipboardData({
            data: "https://riyu.love",
            success: () => {
                toast.success("复制成功");
            },
        });
    };

    return (
        <View className="page">
            <View className={styles.title}>轻松考 网页版</View>

            <View className={styles.imageWrapper}>
                {webAppImage && (
                    <Image
                        src={webAppImage.value as string}
                        // className={styles.image)}
                        mode="aspectFit"
                    />
                )}
            </View>

            <View className={styles.feature}>
                <View className={styles.featureItem}>
                    <IconFont
                        name="icon_love_hover"
                        size={26}
                        color={"#f87171"}
                    />
                    <Text>为在电脑上学习的你而准备</Text>
                </View>
                <View className={styles.featureItem}>
                    <IconFont name="zhanghao" size={26} color={"#10b981"} />
                    <Text>账号与小程序同步</Text>
                </View>
                <View className={styles.urlPart}>
                    <Text className={styles.urlLabel}>网址</Text>
                    <Text className={styles.url} userSelect>
                        riyu.love
                    </Text>
                </View>

                <Button
                    className="btn btn-primary--outline"
                    hover-class="none"
                    onClick={copyURL}
                >
                    复制网址
                </Button>
            </View>
        </View>
    );
}
