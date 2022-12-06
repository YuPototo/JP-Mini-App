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
        // 会导致排版问题
        <Text className={clsx({ "jp-bold": bold, "jp-underline": underline })}>
            {text}
        </Text>
    );
}
