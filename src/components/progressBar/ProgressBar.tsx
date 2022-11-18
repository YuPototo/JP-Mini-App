import { View } from "@tarojs/components";
import { ReactElement } from "react";
import styles from "./ProgressBar.module.scss";

interface Props {
    pct: number;
}

const pctToStr = (pct: number): string => {
    return Math.round(pct * 100) + "%";
};

export default function Progress({ pct }: Props): ReactElement {
    const width = pctToStr(pct);
    const widthStyle = { width };
    return (
        <View className={styles.progressWrapper}>
            <View className={styles.progressDone} style={widthStyle}></View>
        </View>
    );
}
