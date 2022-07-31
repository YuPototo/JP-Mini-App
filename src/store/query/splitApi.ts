import { createApi } from "@reduxjs/toolkit/query/react";
import { wxRequestBaseQuery } from "./wxRequestBaseQuery";

const API_URL = process.env.BACKEND_API;

if (!API_URL) {
    throw Error("BACKEND_API is not defined");
}

export const splitApi = createApi({
    reducerPath: "api",
    baseQuery: wxRequestBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: () => ({}),
});
