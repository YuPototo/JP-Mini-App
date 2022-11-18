import GoodsList from "@/features/order/components/GoodsList";
import MemberBenifit from "@/features/order/components/MemberBenefits";
import Testimonial from "@/features/order/components/Testimonial";
import { useGetGoodsQuery } from "@/features/order/orderService";
import { IGood } from "@/features/order/orderType";
import { View } from "@tarojs/components";
import clsx from "clsx";
import styles from "./memberLandingPage.module.scss";

const ONE_MONTH_NAME = "1月会员";
const BACKUP_PRICE = 7; // 单位：元

export default function memberLanding() {
    const { data: goods } = useGetGoodsQuery();

    const oneMonthPrice = getOneMonthPrice(ONE_MONTH_NAME, BACKUP_PRICE, goods);

    return (
        <View className="page">
            <View className={clsx("full-width", styles.part)}>
                <View className={styles.heading}>成为会员</View>
                <MemberBenifit monthlyPrice={oneMonthPrice} />
            </View>

            <View className={clsx("full-width", styles.part)}>
                <View className={styles.heading}>用户推荐</View>
                <Testimonial />
                <View className={styles.countCopy}>
                    自2019年以来，服务超过8万学习者。
                </View>
            </View>

            <GoodsList />

            <View className={styles.bottomBox}></View>
        </View>
    );
}

const getOneMonthPrice = (
    oneMonthName: string,
    backUpPrice: number,
    goods?: IGood[]
) => {
    if (!goods) {
        return backUpPrice;
    }
    const good = goods.find((good) => good.name === oneMonthName);

    if (good) {
        return good.price / 100;
    } else {
        return backUpPrice;
    }
};
