import QuestionSetListOperator from "@/components/QuestionSetListOperator/QuestionSetListOperator";
import { useGetNotebookContentQuery } from "@/features/notebook/notebookService";
import {
    noteBookPracticeStarted,
    notebookQuestionSetIndexChanged,
    questionSetIdsAdded,
} from "@/features/notebook/notebookSlice";
import QuestionSet from "@/features/questionSet/components/QuestionSet";
import { useGetQuestionSetLoadingInfo } from "@/features/questionSet/hooks/useGetQuestionSetLoadingInfo";
import { PracticeMode } from "@/features/questionSet/questionSetTypes";
import PayWall from "@/features/user/components/PayWall";
import { useChanceGuard } from "@/features/user/useChanceGuard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { navigate } from "@/utils/navigator/navigator";
import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";
import ProgressBar from "@/components/progressBar/ProgressBar";
import styles from "./practiceNotebookPage.module.scss";

export default function practiceNotebookPage() {
    const dispatch = useAppDispatch();

    const showPayWall = useChanceGuard();

    // init practice notebook page
    const { questionSetId, questionSetIds, questionSetIndex } =
        useInitNotebookPractice();

    // get question set loading info
    const { isLoadingQuestionSet, isFetchingQuestionSet } =
        useGetQuestionSetLoadingInfo(questionSetId);

    if (questionSetId === undefined) {
        return (
            <View>questionSetIds 里找不到第{questionSetIndex}个 element</View>
        );
    }

    const handleToLast = () => {
        const lastQuestionSetIndex = questionSetIndex - 1;
        dispatch(notebookQuestionSetIndexChanged(lastQuestionSetIndex));
    };

    const handleToNext = () => {
        const nextQuestionSetIndex = questionSetIndex + 1;
        dispatch(notebookQuestionSetIndexChanged(nextQuestionSetIndex));
    };

    const handleFinish = () => {
        navigate(-1);
    };

    return (
        <View className={styles.page}>
            {showPayWall && <PayWall />}

            <ProgressBar pct={(questionSetIndex + 1) / questionSetIds.length} />

            {questionSetId !== undefined && (
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.Notebook}
                />
            )}

            {!isLoadingQuestionSet && (
                <QuestionSetListOperator
                    index={questionSetIndex}
                    questionSetCount={questionSetIds.length}
                    disabled={isFetchingQuestionSet}
                    onToLast={handleToLast}
                    onToNext={handleToNext}
                    onFinish={handleFinish}
                />
            )}
        </View>
    );
}

function useInitNotebookPractice() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // starting index: 只在页面启动时使用，之后不再使用
    const { notebookId, startingIndex } = router.params as {
        notebookId: string;
        startingIndex: string;
    };

    useEffect(() => {
        dispatch(noteBookPracticeStarted(notebookId));
        dispatch(notebookQuestionSetIndexChanged(parseInt(startingIndex)));
    }, [notebookId, dispatch]);

    const { data } = useGetNotebookContentQuery(notebookId);

    useEffect(() => {
        data && dispatch(questionSetIdsAdded(data));
    }, [dispatch, data]);

    // 从 store 里获取 questionSetIds，因为在做题过程中，可能会添加新的 questionSet 到 notebook 里，这时候 query 里的 questionSets 是最新的。但我不需要最新的 questionSets。
    const questionSetIds = useAppSelector(
        (state) => state.notebook.questionSetIds
    );

    const questionSetIndex = useAppSelector(
        (state) => state.notebook.questionSetIndex
    );
    const questionSetId = questionSetIds[questionSetIndex];

    return {
        notebookId,
        questionSetId,
        questionSetIds,
        questionSetIndex,
    };
}
