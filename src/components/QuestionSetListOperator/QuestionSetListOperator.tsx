import { usePrefetch } from "@/features/questionSet/questionSetService";
import { selectIsDone } from "@/features/questionSet/questionSetSlice";
import { showAnswer } from "@/features/questionSet/questionSetThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { View } from "@tarojs/components";
import clsx from "clsx";
import { useEffect } from "react";
import styles from "./QuestionSetListOperator.module.scss";

/**
 * 操作一列 questionSet 的组件
 */

type Props = {
    index: number; // 当前的题目 index
    questionSetCount: number; // 总的题目数量
    disabled: boolean; // 是否不允许操作
    nextQuestionSetId?: string; // 下一题的 id
    onToLast: () => void; // 去上一题
    onToNext: () => void; // 去下一题
    onFinish: () => void; // 结束
};

export default function QuestionSetListOperator({
    index,
    questionSetCount,
    disabled,
    nextQuestionSetId,
    onToLast,
    onToNext,
    onFinish,
}: Props) {
    const dispatch = useAppDispatch();
    const isDone = useAppSelector(selectIsDone);

    const hasNext = index < questionSetCount - 1;

    const prefetchQuestionSet = usePrefetch("getQuestionSet"); // prefetch：用于提前获取题目
    useEffect(() => {
        if (hasNext && nextQuestionSetId) {
            // 预加载下一个题目
            prefetchQuestionSet(nextQuestionSetId);
        }
    }, [nextQuestionSetId]);

    const isQuestionSetError = useAppSelector(
        (state) => state.questionSet.isError
    );

    const hasPreviousQuestionSet = index > 0;

    const handleContinue = () => {
        if (disabled) return;
        hasNext ? onToNext() : onFinish();
    };

    const handleToLast = () => {
        if (disabled) return;
        if (!hasPreviousQuestionSet) return;
        onToLast();
    };

    return (
        <View className={clsx("full-width", styles.btnArea)}>
            <View
                className={clsx("btn btn-primary--outline", styles.btn, {
                    [`${styles.hide}`]: showNextBtn(isDone, isQuestionSetError),
                })}
                onClick={handleToLast}
            >
                上一题
            </View>

            <View
                className={clsx("btn btn-primary--outline", styles.btn, {
                    [`${styles.hide}`]: isDone,
                })}
                onClick={() => dispatch(showAnswer())}
            >
                答案
            </View>

            <View
                className={clsx("btn btn-primary", styles.btn, {
                    [`${styles.hide}`]: !isDone,
                })}
                onClick={handleContinue}
            >
                {hasNext ? "下一题" : "完成"}
            </View>
        </View>
    );
}

function showNextBtn(isDone: boolean, isQuestionSetError: boolean) {
    if (isQuestionSetError) return true;
    return isDone;
}
