import { View, Text } from "@tarojs/components";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function Example({ title, children }: Props) {
    return (
        <View style={{ marginBottom: "60px" }}>
            <Text
                style={{ margin: "20px", fontWeight: "bold", fontSize: "20px" }}
            >
                {title}
            </Text>
            {children}
        </View>
    );
}
