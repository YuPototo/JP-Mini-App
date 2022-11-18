import RichTextRenderer from "@/utils/renderer";
import { View } from "@tarojs/components";
import styles from "./Body.module.scss";

export default function Body({ body }: { body?: string }) {
    if (!body) return null;
    return (
        <View className={styles.body}>
            <RichTextRenderer data={body} />
        </View>
    );
}
