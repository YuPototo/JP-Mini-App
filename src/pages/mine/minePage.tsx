import { login } from "@/features/user/userThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { View } from "@tarojs/components";

export default function mine() {
    const dispatch = useAppDispatch();
    const displayId = useAppSelector(state => state.user.displayId);
    const isLoginFailure = useAppSelector(state => state.user.isLoginFailure);

    const idOrMessage = isLoginFailure
        ? "登录失败，点击此处重新登录"
        : displayId;

    return (
        <View>
            <View onClick={() => dispatch(login())}>ID: {idOrMessage}</View>
        </View>
    );
}
