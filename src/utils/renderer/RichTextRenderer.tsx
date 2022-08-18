import checkIsNode from "./checkIsNode";
import { Text, View } from "@tarojs/components";
import Nodes from "./Nodes";

type Props = {
    data: string;
};

export default function RichTextRenderer({ data }: Props) {
    // step 1: parse data to json
    let value: unknown;
    try {
        value = JSON.parse(data);
    } catch (err) {
        if (err instanceof SyntaxError) {
            return (
                <Text data-testid="rich-text">
                    json parse 错误：{err.toString()}
                </Text>
            );
        } else {
            return (
                <Text data-testid="rich-text">
                    Json Parse 过程中出现未知错误
                </Text>
            );
        }
    }

    // step2: validate value is INode[]
    if (!checkIsNode(value)) {
        console.error("parsed value 的 interface 不符合需求");
        return (
            <Text data-testid="rich-text">
                parsed value 的 interface 不符合需求
            </Text>
        );
    }

    // step3: render
    return (
        <View data-testid="rich-text" className="jp-rich-text">
            <Nodes value={value} />
        </View>
    );
}
