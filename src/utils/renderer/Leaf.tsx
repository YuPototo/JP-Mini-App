import clsx from "clsx";
import { Text } from "@tarojs/components";

type Props = {
    text: string;
    bold?: boolean;
    underline?: boolean;
};

export default function Leaf({ text, bold, underline }: Props) {
    return (
        // 为什么不适用 user-select 属性？
        // 会导致排版问题。这个问题需要解决，否则 iOS 无法选择文本。
        // 现在通过 user-select CSS 属性来支持选择文本，但 iOS 无法选择。
        <Text className={clsx({ "jp-bold": bold, "jp-underline": underline })}>
            {text}
        </Text>
    );
}
