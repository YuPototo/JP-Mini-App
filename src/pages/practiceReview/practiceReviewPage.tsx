import { Button, View } from "@tarojs/components";
import { useRouter, navigateBack } from "@tarojs/taro";
import { useAppDispatch } from "@/store/hooks";
import QuestionSet from "@/features/questionSet/components/QuestionSet";
import { PracticeMode } from "@/features/questionSet/questionSetTypes";
import { showAnswer } from "@/features/questionSet/questionSetThunks";

type Props = {};

export default function practiceReview({}: Props) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    /** tech debt
     * * 移除 as keyword
     */
    const { questionSetId } = router.params as { questionSetId: string };

    return (
        <View>
            <QuestionSet
                questionSetId={questionSetId}
                practiceMode={PracticeMode.Chapter}
            />

            <View>
                <Button onClick={() => dispatch(showAnswer())}>显示答案</Button>
                <Button onClick={() => navigateBack()}>返回</Button>
            </View>
        </View>
    );
}
