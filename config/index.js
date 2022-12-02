import path from "path";

const config = {
    projectName: "wx",
    date: "2022-7-31",
    designWidth: 750,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [],
    defineConstants: {},
    copy: {
        patterns: [],
        options: {},
    },
    framework: "react",
    compiler: "webpack5",
    cache: {
        enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
        postcss: {
            pxtransform: {
                enable: true,
                config: {},
            },
            url: {
                enable: true,
                config: {
                    limit: 1024, // 设定转换尺寸上限
                },
            },
            cssModules: {
                enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: "module", // 转换模式，取值为 global/module
                    generateScopedName: "[name]__[local]___[hash:base64:5]",
                },
            },
        },
        miniCssExtractPluginOption: {
            //忽略css文件引入顺序
            ignoreOrder: true,
        },
    },
    alias: {
        "@/features": path.resolve(__dirname, "..", "src/features"),
        "@/utils": path.resolve(__dirname, "..", "src/utils"),
        "@/store": path.resolve(__dirname, "..", "src/store"),
        "@/routes": path.resolve(__dirname, "..", "src/routes"),
        "@/components": path.resolve(__dirname, "..", "src/components"),
    },
};

module.exports = function (merge) {
    if (process.env.NODE_ENV === "development") {
        return merge({}, config, require("./dev"));
    }
    return merge({}, config, require("./prod"));
};
