import { View, Image, Text } from "@tarojs/components";
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

    return (
        <View className="jp-image">
            {renderImage && (
                <Image
                    style={{ display: isLoading ? "none" : "auto" }}
                    src={element.src}
                    onError={() => setIsError(true)}
                    onLoad={() => setIsLoading(false)}
                ></Image>
            )}

            {showSkeleton && (
                <View>
                    <Text>加载中: 展示一个 skeleton</Text>
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
