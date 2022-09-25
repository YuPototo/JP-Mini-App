import React, { useEffect } from "react";
import "./app.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./utils/abortcontroller-polyfill/dist/abortcontroller-polyfill-only";
import { useAppDispatch } from "./store/hooks";
import { getLocalUserInfo } from "./features/user/userThunks";
import { getWorkingProgress } from "./features/progress/progressThunks";

const InnerApp: React.FC<{ children: React.ReactNode }> = props => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getLocalUserInfo());
        dispatch(getWorkingProgress());
    }, []);
    return <>{props.children}</>;
};

const App: React.FC<{ children: React.ReactNode }> = props => {
    return (
        <Provider store={store}>
            <InnerApp>{props.children}</InnerApp>
        </Provider>
    );
};
export default App;
