import checkIsNode from "./checkIsNode";
import { Text, View } from "@tarojs/components";
import Nodes from "./Nodes";

type Props = {
    data: any;
};

export default function RichTextRenderer({ data }: Props) {
    // step1: validate value is INode[]
    if (!checkIsNode(data)) {
        console.error("parsed value 的 interface 不符合需求");
        return (
            <Text data-testid="rich-text">
                parsed value 的 interface 不符合需求
            </Text>
        );
    }

    // step2: render
    return (
        <View data-testid="rich-text" className="jp-rich-text">
            <Nodes value={data} />
        </View>
    );
}
