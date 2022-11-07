import { pageList, removeFirstCharacter, pageNames } from "./routes/routes";
import { useGlobalIconFont } from "./components/iconfont/helper";

// * 设置修改时需要重新 build

export default defineAppConfig({
    pages: pageList,
    tabBar: {
        list: [
            {
                pagePath: removeFirstCharacter(pageNames.homePage),
                text: "首页",
                iconPath: "assets/home.png",
                selectedIconPath: "assets/home-active.png",
            },
            {
                pagePath: removeFirstCharacter(pageNames.bookShelf),
                text: "书架",
                iconPath: "assets/orders.png",
                selectedIconPath: "assets/orders-active.png",
            },
            {
                pagePath: removeFirstCharacter(pageNames.notebookList),
                text: "笔记本",
                iconPath: "assets/star.png",
                selectedIconPath: "assets/star-active.png",
            },
            {
                pagePath: removeFirstCharacter(pageNames.mine),
                text: "我",
                iconPath: "assets/user.png",
                selectedIconPath: "assets/user-active.png",
            },
        ],
    },
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black",
    },
    requiredBackgroundModes: ["audio"],
    usingComponents: Object.assign(useGlobalIconFont()),
});
