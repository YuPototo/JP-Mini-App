import { View, Text } from "@tarojs/components";
import { ReactElement } from "react";
import Nodes from "../Nodes";
import { ITip } from "../type";

type Props = {
    element: ITip;
};

export default function Tip({ element }: Props): ReactElement {
    return (
        <View className="jp-tip">
            <Nodes value={element.children} />
            <View className="jp-tip-content">
                <Text>{element.tip}</Text>
            </View>
        </View>
    );
}
