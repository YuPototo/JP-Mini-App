import { pageList } from "./routes";

export default defineAppConfig({
    pages: pageList,
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black"
    }
});
