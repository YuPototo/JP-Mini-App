import clsx from "clsx";
import { Text } from "@tarojs/components";

type Props = {
    text: string;
    bold?: boolean;
    underline?: boolean;
};

export default function Leaf({ text, bold, underline }: Props) {
    return (
        <Text className={clsx({ "jp-bold": bold, "jp-underline": underline })}>
            {text}
        </Text>
    );
}
