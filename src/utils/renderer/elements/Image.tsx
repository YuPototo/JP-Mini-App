import { View, Image, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { ReactElement, useState } from "react";
import { IImage } from "../type";

type Props = {
    element: IImage;
};

export default function JpImage({ element }: Props): ReactElement {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const renderImage = !isError;
    const showSkeleton = isLoading && !isError;

    const viewImage = (url: string) => {
        Taro.previewImage({
            current: url, //当前图片地址
            urls: [url], //所有要预览的图片的地址集合 数组形式
            showmenu: true, //是否显示菜单
        });
    };

    return (
        <View className="jp-image">
            {renderImage && (
                <Image
                    style={{ display: isLoading ? "none" : "auto" }}
                    src={element.src}
                    onError={() => setIsError(true)}
                    onLoad={() => setIsLoading(false)}
                    mode="aspectFit"
                    onClick={() => viewImage(element.src)}
                ></Image>
            )}

            {showSkeleton && (
                <View>
                    <Text>图片加载中..</Text>
                </View>
            )}

            {isError && (
                <View>
                    <View>{element.alt} 图片加载错误</View>
                    <View>src：{element.src}</View>
                </View>
            )}
        </View>
    );
}
