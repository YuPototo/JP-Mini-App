import Taro from "@tarojs/taro";

type Options = {
    method: "redirectTo" | "navigateTo" | "switchTab";
};

export function navigate(delta: number): void;
export function navigate(url: string): void;
export function navigate(url: string, option: Options): void;
export function navigate(arg: string | number, option?: Options) {
    if (typeof arg === "string" && !option) {
        Taro.navigateTo({ url: arg });
    } else if (typeof arg === "string" && option) {
        switch (option.method) {
            case "redirectTo":
                Taro.redirectTo({ url: arg });
                break;
            case "navigateTo":
                Taro.navigateTo({ url: arg });
                break;
            case "switchTab":
                Taro.switchTab({ url: arg });
                break;
        }
    } else if (typeof arg === "number") {
        Taro.navigateBack({ delta: arg });
    } else {
        throw new Error("navigate 参数错误");
    }
}
