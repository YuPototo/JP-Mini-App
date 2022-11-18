import IconFont from "@/components/iconfont";
import { useGetParameterQuery } from "@/features/parameter/parameterService";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import clsx from "clsx";
import { ReactElement } from "react";

import styles from "./DirectionModal.module.scss";

interface Props {
    onCloseModal: () => void;
}

export default function DirectionModal({ onCloseModal }: Props): ReactElement {
    const { data: qrCode } = useGetParameterQuery("qr_code");

    const preventBuble = (event: any) => {
        event.stopPropagation();
    };

    const viewQRCode = () => {
        if (qrCode) {
            Taro.previewImage({
                current: qrCode.value as string, //当前图片地址
                urls: [qrCode.value as string], //所有要预览的图片的地址集合 数组形式
            });
        }
    };
    return (
        <View className={"mask"} onClick={onCloseModal}>
            <View className={clsx(styles.modal)} onClick={preventBuble}>
                <View className={styles.closeWrapper} onClick={onCloseModal}>
                    <IconFont name="guanbi" size={28} color={"green"} />
                </View>
                <View className={styles.title}>如何成为会员</View>
                <View className={styles.hint}>
                    <View className={styles.methodPart}>
                        <View className={styles.methodTitle}>方法1</View>
                        <View className={styles.methodText}>
                            使用安卓手机，在小程序内直接开通
                        </View>
                    </View>
                    <View className={styles.methodPart}>
                        <View className={styles.methodTitle}>方法2</View>
                        <View className={styles.methodText}>
                            1. 点击二维码，添加开发者微信
                        </View>
                        <View className={styles.methodText}>
                            2. 开发者在后台开通会员
                        </View>
                    </View>
                </View>

                <View className={styles.imageWrapper}>
                    {qrCode && (
                        <Image
                            onClick={viewQRCode}
                            className={styles.image}
                            src={qrCode.value as string}
                            mode="aspectFit"
                        />
                    )}
                </View>
                <View className={styles.weixinId}>微信号：amazing_pototo</View>
                <View
                    className={clsx("btn btn-primary--outline")}
                    onClick={viewQRCode}
                >
                    打开二维码
                </View>
            </View>
        </View>
    );
}
