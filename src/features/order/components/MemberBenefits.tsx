import { View, Image } from "@tarojs/components";
import clsx from "clsx";
import styles from "./MemberBenefits.module.scss";
import crownLogo from "../../../assets/member_crown.png";
import priceLogo from "../../../assets/member_price.png";
import timeLogo from "../../../assets/member_time.png";

interface Props {
    monthlyPrice: number; // 单位：元
}

export default function MemberBenifit({ monthlyPrice }: Props) {
    return (
        <View className={styles.wrapper}>
            <View className={styles.infoPart}>
                <View className={clsx(styles.iconWrapper, styles.iconPurple)}>
                    <Image src={crownLogo} className={styles.icon} />
                </View>
                <View className={styles.infoPartTitle}>权益</View>
                <View>
                    <View className={styles.msgList}>
                        <View
                            className={clsx(
                                styles.msgItem,
                                styles.msgItemStrong
                            )}
                        >
                            无限刷题
                        </View>
                    </View>
                </View>
            </View>

            <View className={styles.infoPart}>
                <View className={clsx(styles.iconWrapper, styles.iconRed)}>
                    <Image src={priceLogo} className={styles.icon} />
                </View>
                <View className={styles.infoPartTitle}>价格</View>
                <View>
                    <View className={styles.msgList}>
                        <View
                            className={clsx(
                                styles.msgItem,
                                styles.msgItemStrong
                            )}
                        >
                            {monthlyPrice}元/月
                        </View>
                    </View>
                </View>
            </View>

            <View className={styles.infoPart}>
                <View className={clsx(styles.iconWrapper, styles.iconGreen)}>
                    <Image src={timeLogo} className={styles.icon} />
                </View>
                <View className={styles.infoPartTitle}>时长</View>
                <View>
                    <View className={styles.msgList}>
                        <View
                            className={clsx(
                                styles.msgItem,
                                styles.msgItemStrong
                            )}
                        >
                            30天
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
