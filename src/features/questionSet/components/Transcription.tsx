import { View } from "@tarojs/components";

export default function Transcription({
    transcription
}: {
    transcription?: string;
}) {
    if (!transcription) return <></>;
    return <View>{transcription}</View>;
}