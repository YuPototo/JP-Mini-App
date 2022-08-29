import { splitApi } from "../../store/query/splitApi";
import { IUser } from "./userTypes";
import storageService from "../../utils/storageService";
import Taro from "@tarojs/taro";
import { getErrorMessage } from "@/utils/errorHandler";

interface LoginRes {
    token: string;
    user: IUser;
}

export const userApi = splitApi.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<LoginRes, string>({
            query: (code: string) => ({
                url: "/users/login/wx/miniApp2",
                method: "POST",
                body: { loginCode: code }
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    storageService.setUserInfo(data.token, data.user.displayId);
                } catch (err) {
                    // todo: 获取 err 内容
                    const message = `登录失败: ${getErrorMessage(err)}`;
                    console.error(message);
                    Taro.showModal({
                        title: "登录失败",
                        content: message
                    });
                }
            }
        })
    })
});

export const { useLoginMutation } = userApi;
