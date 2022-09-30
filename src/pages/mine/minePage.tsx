import { login } from "@/features/user/userThunks";
import routes from "@/routes/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { navigate } from "@/utils/navigator/navigator";
import { View } from "@tarojs/components";

export default function mine() {
    const dispatch = useAppDispatch();
    const displayId = useAppSelector(state => state.user.displayId);
    const isLoginFailure = useAppSelector(state => state.user.isLoginFailure);

    const quizChance = useAppSelector(state => state.user.quizChance);
    const isMember = useAppSelector(state => state.user.isMember);

    const idOrMessage = isLoginFailure
        ? "登录失败，点击此处重新登录"
        : displayId;

    return (
        <View>
            <View>会员状态：{isMember ? "是" : "否"}</View>
            <View>做题机会：{quizChance}</View>
            <View onClick={() => dispatch(login())}>ID: {idOrMessage}</View>
            <View onClick={() => navigate(routes.memberLanding())}>
                成为会员
            </View>
        </View>
    );
}
