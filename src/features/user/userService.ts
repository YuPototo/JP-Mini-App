import { splitApi } from "../../store/query/splitApi";
import { IUser } from "./userTypes";
import userStorage from "./userStorage";
import { getErrorMessage } from "@/utils/errorHandler";
import { showLoginFailureModal } from "./components/showLoginFailureModal";
import { login } from "./userThunks";

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
                    userStorage.setUserInfo(data.token, data.user.displayId);
                } catch (err) {
                    const maybeMessage = err.error?.data?.message;
                    const errMessage = maybeMessage ?? getErrorMessage(err);
                    console.error("登录失败 ", errMessage);
                    showLoginFailureModal(errMessage, () => dispatch(login()));
                }
            }
        }),
        getUser: build.query<IUser, void>({
            query: () => "/users",
            transformResponse: (res: { user: IUser }) => res.user
        }),
        reduceQuizChance: build.mutation<void, void>({
            query: () => ({
                url: "/users/reduceQuizChance",
                method: "PUT"
            })
        })
    })
});

export const { useLoginMutation, useGetUserQuery } = userApi;
