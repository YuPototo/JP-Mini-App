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
        prepareHeaders: ({ getState }) => {
            // const token = (getState() as RootState).auth.token; // 无法这样用，会导致循环引用，不知道为什么
            const state = getState() as any;
            const token = state.user.token;
            if (token) {
                return { authorization: `Bearer ${token}` };
            }
        }
    }),
    endpoints: () => ({}),
    tagTypes: ["BookFav", "ChapterDone", "Notebook"]
});
