import { View } from "@tarojs/components";
import Nodes from "../Nodes";
import { IElement } from "../type";

type Props = {
    element: IElement;
};

export default function Paragraph({ element }: Props) {
    return (
        <View className="jp-paragraph">
            <Nodes value={element.children} />
        </View>
    );
}
