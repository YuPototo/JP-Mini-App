import React, { useEffect } from "react";
import "./app.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./utils/abortcontroller-polyfill/dist/abortcontroller-polyfill-only";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getLocalUserInfo } from "./features/user/userThunks";
import { getWorkingProgress } from "./features/progress/progressThunks";
import { selectIsLogin } from "./features/user/userSlice";
import { useGetUserQuery } from "./features/user/userService";
import { useGetParameterQuery } from "./features/parameter/parameterService";
import { getSystemPlatform } from "./features/parameter/parameterSlice";
import { autoUpdate } from "./utils/updator";

const InnerApp: React.FC<{ children: React.ReactNode }> = (props) => {
    const dispatch = useAppDispatch();

    const isLogin = useAppSelector(selectIsLogin);

    useGetUserQuery(undefined, { skip: !isLogin });
    useGetParameterQuery("isAuditMode");

    useEffect(() => {
        autoUpdate();
        dispatch(getLocalUserInfo());
        dispatch(getWorkingProgress());
        dispatch(getSystemPlatform());
    }, []);

    return <>{props.children}</>;
};

const App: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <Provider store={store}>
            <InnerApp>{props.children}</InnerApp>
        </Provider>
    );
};
export default App;
