import { View, Text } from "@tarojs/components";

export default function Transcription({
    transcription,
}: {
    transcription?: string;
}) {
    if (!transcription) return <></>;
    return (
        <View style={{ whiteSpace: "pre-line" }}>
            <Text userSelect={true}>{transcription}</Text>
        </View>
    );
}
