import React from "react";
import "./app.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";

const InnerApp: React.FC<{ children: React.ReactNode }> = (props) => {
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