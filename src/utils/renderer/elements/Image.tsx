import { View, Image } from "@tarojs/components";
import { ReactElement } from "react";
import { IImage } from "../type";

type Props = {
    element: IImage;
};

export default function JpImage({ element }: Props): ReactElement {
    return (
        <View className="jp-image">
            <Image src={element.src}></Image>
        </View>
    );
}
