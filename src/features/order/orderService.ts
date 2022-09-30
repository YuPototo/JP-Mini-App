import { splitApi } from "@/store/query/splitApi";
import { IGood } from "./orderType";

interface GoodsResponse {
    goods: IGood[];
}

interface PrepayData {
    timeStamp: string;
    nonceStr: string;
    package: string;
    signType: "MD5" | "HMAC-SHA256" | "RSA" | undefined;
    paySign: string;
}

interface CreateOrderRes {
    orderId: string;
    prepayOrder: PrepayData;
}

export const orderApi = splitApi.injectEndpoints({
    endpoints: build => ({
        getGoods: build.query<IGood[], void>({
            query: () => "/goods",
            transformResponse: (res: GoodsResponse) => res.goods,
            keepUnusedDataFor: 1000
        }),
        createOrder: build.mutation<CreateOrderRes, string>({
            query: goodId => ({
                url: "/orders",
                method: "POST",
                body: { goodId }
            })
        }),
        getOrder: build.query<{ state: "SUCCESS" | "FAIL" }, string>({
            query: orderId => `/orders?orderId=${orderId}`
        })
    })
});

export const { useGetGoodsQuery, useCreateOrderMutation } = orderApi;
