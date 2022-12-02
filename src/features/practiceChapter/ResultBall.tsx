import { View } from "@tarojs/components";
import clsx from "clsx";
import { Result } from "./practiceChapterSlice";
import type { QuestionSetResult } from "./practiceChapterTypes";
import styles from "./ResultBall.module.scss";

type Props = {
    questionSetResult: QuestionSetResult;
    index: number;
};

export default function ResultBall({ questionSetResult, index }: Props) {
    const { result } = questionSetResult;

    const ballCss = (result: Result) =>
        clsx(styles.ball, {
            [`${styles["ball-right"]}`]: result === Result.Right,
            [`${styles["ball-wrong"]}`]: result === Result.Wrong,
        });

    return <View className={ballCss(result)}>{index + 1}</View>;
}
