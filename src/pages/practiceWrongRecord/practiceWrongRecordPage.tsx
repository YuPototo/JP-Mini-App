import QuestionSetListOperator from "@/components/QuestionSetListOperator/QuestionSetListOperator";
import QuestionSet from "@/features/questionSet/components/QuestionSet";
import { useGetQuestionSetLoadingInfo } from "@/features/questionSet/hooks/useGetQuestionSetLoadingInfo";
import { PracticeMode } from "@/features/questionSet/questionSetTypes";
import { useGetWrongRecordQuery } from "@/features/wrongRecord/wrongRecordService";
import {
    wrongbookPracticeStarted,
    wrongRecordLoaded,
    wrongRecordPracticeChangedBy,
} from "@/features/wrongRecord/wrongRecordSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { navigate } from "@/utils/navigator/navigator";
import { View } from "@tarojs/components";
import { useEffect } from "react";
import ProgressBar from "@/components/progressBar/ProgressBar";
import styles from "./practiceWrongRecordPage.module.scss";

export default function PracticeWrongRecordPage() {
    const dispatch = useAppDispatch();

    const { questionSetId, questionSetIds, questionSetIndex } =
        useInitWrongBookPractice();

    // get question set loading info
    const { isLoadingQuestionSet, isFetchingQuestionSet } =
        useGetQuestionSetLoadingInfo(questionSetId);

    // state 1：错误，找不到 questionSet
    if (questionSetId === undefined) {
        return (
            <View>
                出错了 wrongRecordSlice.questionSetIds 里找不到第
                {questionSetIndex}个 element
            </View>
        );
    }

    return (
        <View className={styles.page}>
            <ProgressBar pct={(questionSetIndex + 1) / questionSetIds.length} />

            {questionSetId !== undefined && (
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.WrongRecord}
                />
            )}

            {!isLoadingQuestionSet && (
                <QuestionSetListOperator
                    index={questionSetIndex}
                    questionSetCount={questionSetIds.length}
                    disabled={isFetchingQuestionSet}
                    onToLast={() => dispatch(wrongRecordPracticeChangedBy(-1))}
                    onToNext={() => dispatch(wrongRecordPracticeChangedBy(1))}
                    onFinish={() => navigate(-1)}
                />
            )}
        </View>
    );
}

function useInitWrongBookPractice() {
    const dispatch = useAppDispatch();

    const { data } = useGetWrongRecordQuery();

    useEffect(() => {
        dispatch(wrongbookPracticeStarted());
    }, [dispatch]);

    useEffect(() => {
        data && dispatch(wrongRecordLoaded(data));
    }, [data, dispatch]);

    const questionSetIds = useAppSelector(
        (state) => state.wrongRecord.questionSetIds
    );

    const questionSetIndex = useAppSelector(
        (state) => state.wrongRecord.currentQuestionSetIndex
    );

    const questionSetId = questionSetIds[questionSetIndex];

    return {
        questionSetId,
        questionSetIds,
        questionSetIndex,
    };
}
