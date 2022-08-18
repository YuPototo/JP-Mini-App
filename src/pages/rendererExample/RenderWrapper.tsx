import { View } from "@tarojs/components";
import RichTextRenderer from "../../utils/renderer";

type Props = {
    data: string;
};

export default function RenderWrapper({ data }: Props) {
    return (
        <View
            style={{
                margin: "20px 10px",
                padding: "5px",
                backgroundColor: "#e3ffea"
            }}
        >
            <RichTextRenderer data={data} />
        </View>
    );
}
