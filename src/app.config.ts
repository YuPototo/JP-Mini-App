import { pageList, removeFirstCharacter, pageNames } from "./routes/routes";

// * 设置修改时需要重新 build

export default defineAppConfig({
    pages: pageList,
    tabBar: {
        list: [
            {
                pagePath: removeFirstCharacter(pageNames.homePage),
                text: "首页"
            },
            {
                pagePath: removeFirstCharacter(pageNames.bookShelf),
                text: "书架"
            },
            {
                pagePath: removeFirstCharacter(pageNames.notebookList),
                text: "笔记本"
            },
            {
                pagePath: removeFirstCharacter(pageNames.mine),
                text: "我"
            }
        ]
    },
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black"
    },
    requiredBackgroundModes: ["audio"]
});
