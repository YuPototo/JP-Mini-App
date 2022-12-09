import { useAppDispatch, useAppSelector } from "@/store/hooks";
import toast from "@/utils/toast/toast";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import clsx from "clsx";
import { useState } from "react";
import { useGetGoodsQuery, useCreateOrderMutation } from "../orderService";
import { orderCreated } from "../orderSlice";
import DirectionModal from "./DirectionModal";
import styles from "./GoodsList.module.scss";

const SHOWN_GOOD_NAMES = ["1月会员", "3月会员"];
const PRIMARY_GOOD = "3月会员";

export default function GoodsList() {
    const [showModal, setShowModal] = useState(false); // 是否展示 iOS 的 modal
    const [showMore, setShowMore] = useState(false); // 是否展示更多价格

    const dispatch = useAppDispatch();
    const { data: goods } = useGetGoodsQuery();
    const [createOrder] = useCreateOrderMutation();

    const isIOS = useAppSelector((state) => state.parameter.platform === "ios");

    const handleClickGood = (goodId: string) => {
        if (isIOS) {
            setShowModal(true);
        } else {
            handleCreateOrder(goodId);
        }
    };

    const handleCreateOrder = async (goodId: string) => {
        try {
            toast.loading();
            const res = await createOrder(goodId).unwrap();
            toast.hideLoading();

            const option = {
                ...res.prepayOrder,
                success: () => {
                    console.log("pay success");
                    dispatch(orderCreated({ id: res.orderId }));
                },
                fail: () => {
                    console.log("pay fail");
                },
            };
            Taro.requestPayment(option);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View className={styles.btnList}>
            {showModal && (
                <DirectionModal onCloseModal={() => setShowModal(false)} />
            )}
            {goods?.map((good) => {
                if (!showMore) {
                    if (!SHOWN_GOOD_NAMES.includes(good.name)) return;
                }
                return (
                    <View
                        className={clsx(
                            "btn",
                            good.name === PRIMARY_GOOD
                                ? "btn-primary"
                                : "btn-primary--outline"
                        )}
                        key={good.id}
                        onClick={() => handleClickGood(good.id)}
                    >
                        {`${good.name} ${good.price / 100}元`}
                    </View>
                );
            })}

            {!showMore && (
                <View
                    className="btn btn-primary--outline"
                    onClick={() => setShowMore(true)}
                >
                    更长时间
                </View>
            )}
        </View>
    );
}
