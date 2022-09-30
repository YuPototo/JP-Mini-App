import { AppStartListening } from "@/store/listenerMiddleware";
import { navigate } from "@/utils/navigator/navigator";
import toast from "@/utils/toast/toast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";
import { userApi } from "../user/userService";
import { orderApi } from "./orderService";
import { IOrder } from "./orderType";

interface OrderSliceState {
    orderId: string | null;
    orderState: "payed" | "delivered" | null;
}

const initialState: OrderSliceState = {
    orderId: null,
    orderState: null
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderCreated: (state, { payload }: PayloadAction<IOrder>) => {
            state.orderId = payload.id;
            state.orderState = "payed";
        },
        orderDelivered: state => {
            state.orderState = "delivered";
        }
    }
});

export const { orderCreated, orderDelivered } = orderSlice.actions;

export default orderSlice.reducer;

/* listenerMiddleware */

export const addOrderListeners = (startListening: AppStartListening) => {
    startListening({
        actionCreator: orderCreated,
        effect: async (arg, { getState, dispatch }) => {
            // 把 navigate 放在这里
            // 因为翻页后，前一个页面的 loading 图片会消失
            // 所以先翻页，再显示 loading 图标
            navigate(-1);
            toast.loading("更新中...");

            const orderId = arg.payload.id;

            let tryCount = 0;

            const handleGetOrder = async () => {
                tryCount += 1;
                if (tryCount > 5) {
                    toast.hideLoading();
                    clearInterval(interval);
                    const state = getState();
                    Taro.showModal({
                        title: "出错了",
                        content: `会员状态更新失败，请联系客服。\n订单号: ${state.order.orderId}`,
                        showCancel: false
                    });
                }

                const res = await dispatch(
                    orderApi.endpoints.getOrder.initiate(orderId, {
                        forceRefetch: true
                    })
                );

                const data = res.data;

                if (data && data.state === "SUCCESS") {
                    clearInterval(interval);

                    await dispatch(
                        userApi.endpoints.getUser.initiate(undefined, {
                            forceRefetch: true
                        })
                    );
                    dispatch(orderDelivered());
                    toast.hideLoading();
                }
            };

            const interval = setInterval(handleGetOrder, 3000);
            handleGetOrder(); // start immediately
        }
    });
};
