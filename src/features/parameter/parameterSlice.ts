import { AppThunk } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";
import { parameterApi } from "./parameterService";

interface ParameterSliceState {
    isAuditMode: boolean;
    version: string;
    platform: string;
}

const initialState: ParameterSliceState = {
    isAuditMode: true,
    version: "5.0.0",
    platform: "ios", // default ios
};

export const parameterSlice = createSlice({
    name: "parameter",
    initialState,
    reducers: {
        setPlatform: (state, { payload }: PayloadAction<string>) => {
            state.platform = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            parameterApi.endpoints.getParameter.matchFulfilled,
            (state, { payload }) => {
                if (payload.key === "isAuditMode") {
                    state.isAuditMode = payload.value as boolean;
                }
            }
        );
    },
});

export const { setPlatform } = parameterSlice.actions;

export default parameterSlice.reducer;

/* thunks */
export const getSystemPlatform = (): AppThunk => async (dispatch) => {
    try {
        const res = await Taro.getSystemInfoSync();
        dispatch(setPlatform(res.platform));
    } catch (err) {
        console.log(err);
    }
};
