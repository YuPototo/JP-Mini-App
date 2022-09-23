import { selectIsDone } from "@/features/questionSet/questionSetSlice";
import { showAnswer } from "@/features/questionSet/questionSetThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button, View } from "@tarojs/components";

/**
 * 操作一列 questionSet 的组件
 */

type Props = {
    index: number; // 当前的题目 index
    questionSetCount: number; // 总的题目数量
    disabled: boolean; // 是否不允许操作
    onToLast: () => void; // 去上一题
    onToNext: () => void; // 去下一题
    onFinish: () => void; // 结束
};

export default function QuestionSetListOperator({
    index,
    questionSetCount,
    disabled,
    onToLast,
    onToNext,
    onFinish
}: Props) {
    const dispatch = useAppDispatch();
    const isDone = useAppSelector(selectIsDone);

    const isQuestionSetError = useAppSelector(
        state => state.questionSet.isError
    );

    const hasNext = index < questionSetCount - 1;
    const hasPreviousQuestionSet = index > 0;

    const handleContinue = () => {
        hasNext ? onToNext() : onFinish();
    };

    return (
        <View>
            <Button disabled={disabled} onClick={onToLast}>
                上一题
            </Button>

            <Button disabled={disabled} onClick={() => dispatch(showAnswer())}>
                答案
            </Button>

            <Button disabled={disabled} onClick={handleContinue}>
                {hasNext ? "下一题" : "完成"}
            </Button>
        </View>
    );
}

function showNextBtn(isDone: boolean, isQuestionSetError: boolean) {
    if (isQuestionSetError) return true;
    return isDone;
}
