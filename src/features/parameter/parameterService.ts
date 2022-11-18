import { splitApi } from "@/store/query/splitApi";

type ValueType = boolean | string | number;

export const parameterApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getParameter: build.query<{ key: string; value: ValueType }, string>({
            query: (key) => `/parameters/${key}`,
            transformResponse: (res: { value: ValueType; key: string }) => ({
                key: res.key,
                value: res.value,
            }),
        }),
    }),
});

export const { useGetParameterQuery } = parameterApi;
