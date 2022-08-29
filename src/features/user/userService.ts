import { splitApi } from "../../store/query/splitApi";
import { IUser } from "./userTypes";
import storageService from "../../utils/storageService";
import { getErrorMessage } from "@/utils/errorHandler";
import { loginThunk } from "./userSlice";
import { showLoginFailureModal } from "./showLoginFailureModal";

interface LoginRes {
    token: string;
    user: IUser;
}

export const userApi = splitApi.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<LoginRes, string>({
            query: (code: string) => ({
                url: "/users/login/wx/miniApp",
                method: "POST",
                body: { loginCode: code }
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    storageService.setUserInfo(data.token, data.user.displayId);
                } catch (err) {
                    const maybeMessage = err.error?.data?.message;
                    const errMessage = maybeMessage ?? getErrorMessage(err);
                    console.error("登录失败 ", errMessage);
                    showLoginFailureModal(errMessage, () =>
                        dispatch(loginThunk())
                    );
                }
            }
        })
    })
});

export const { useLoginMutation } = userApi;
