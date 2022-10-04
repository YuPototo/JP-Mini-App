import { useAppDispatch } from "@/store/hooks";
import toast from "@/utils/toast/toast";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useGetGoodsQuery, useCreateOrderMutation } from "../orderService";
import { orderCreated } from "../orderSlice";

export default function GoodsList() {
    const dispatch = useAppDispatch();
    const { data: goods } = useGetGoodsQuery();
    const [createOrder] = useCreateOrderMutation();

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
                }
            };
            Taro.requestPayment(option);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View>
            {goods?.map(good => (
                <View key={good.id} onClick={() => handleCreateOrder(good.id)}>
                    {good.name}
                </View>
            ))}
        </View>
    );
}
