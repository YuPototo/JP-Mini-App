import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import QuestionSet from "@/features/questionSet/components/QuestionSet";
import { PracticeMode } from "@/features/questionSet/questionSetTypes";
import { showAnswer } from "@/features/questionSet/questionSetThunks";
import styles from "./practiceSharePage.module.scss";
import clsx from "clsx";
import { selectIsDone } from "@/features/questionSet/questionSetSlice";
import { navigate } from "@/utils/navigator/navigator";
import routes from "@/routes/routes";

type Props = {};

export default function practiceShare({}: Props) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isDone = useAppSelector(selectIsDone);

    const { questionSetId } = router.params as { questionSetId: string };

    return (
        <View className={styles.page}>
            <QuestionSet
                questionSetId={questionSetId}
                practiceMode={PracticeMode.Share}
            />

            <View className={clsx("full-width", styles.btnArea)}>
                <View
                    className={clsx("btn btn-primary--outline", styles.btn)}
                    onClick={() => dispatch(showAnswer())}
                >
                    答案
                </View>

                <View
                    style={{ visibility: isDone ? "visible" : "hidden" }}
                    className={clsx("btn btn-primary", styles.btn)}
                    onClick={() => {
                        navigate(routes.home(), { method: "switchTab" });
                    }}
                >
                    更多练习
                </View>
            </View>
        </View>
    );
}
