import { View } from "@tarojs/components";
import { useRouter, navigateBack } from "@tarojs/taro";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import QuestionSet from "@/features/questionSet/components/QuestionSet";
import { PracticeMode } from "@/features/questionSet/questionSetTypes";
import { showAnswer } from "@/features/questionSet/questionSetThunks";
import styles from "./practiceReviewPage.module.scss";
import clsx from "clsx";
import { selectIsDone } from "@/features/questionSet/questionSetSlice";

type Props = {};

export default function practiceReview({}: Props) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isDone = useAppSelector(selectIsDone);

    const { questionSetId } = router.params as { questionSetId: string };

    return (
        <View className={styles.page}>
            <QuestionSet
                questionSetId={questionSetId}
                practiceMode={PracticeMode.Chapter}
            />

            <View className={clsx("full-width", styles.btnArea)}>
                <View
                    style={{ visibility: "hidden" }}
                    className={clsx("btn", styles.btn)}
                >
                    隐藏
                </View>
                <View
                    className={clsx("btn btn-primary--outline", styles.btn)}
                    onClick={() => dispatch(showAnswer())}
                >
                    答案
                </View>

                <View
                    style={{ visibility: isDone ? "visible" : "hidden" }}
                    className={clsx("btn btn-primary--outline", styles.btn)}
                    onClick={() => navigateBack()}
                >
                    返回
                </View>
            </View>
        </View>
    );
}
