import QuestionSetListOperator from "@/components/QuestionSetListOperator/QuestionSetListOperator";
import { useGetNotebookContentQuery } from "@/features/notebook/notebookService";
import {
    notebookQuestionSetIndexChanged,
    notebookUsed,
    questionSetIdsAdded
} from "@/features/notebook/notebookSlice";
import QuestionSet from "@/features/questionSet/components/QuestionSet";
import { useGetQuestionSetQuery } from "@/features/questionSet/questionSetService";
import { PracticeMode } from "@/features/questionSet/questionSetTypes";
import routes from "@/routes/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";

export default function practiceNotebookPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { notebookId, questionSetIndex: qSetIndexString } = router.params as {
        notebookId: string;
        questionSetIndex: string;
    };

    useEffect(() => {
        dispatch(notebookUsed(notebookId));
        dispatch(notebookQuestionSetIndexChanged(parseInt(qSetIndexString)));
    }, [notebookId, dispatch]);

    const { data: questionSetIds } = useGetNotebookContentQuery(notebookId);

    useEffect(() => {
        questionSetIds && dispatch(questionSetIdsAdded(questionSetIds));
    }, [dispatch, questionSetIds]);

    const questionSets = questionSetIds || [];
    const questionSetIndex = useAppSelector(
        state => state.notebook.questionSetIndex
    );
    const questionSetId = questionSets[questionSetIndex];

    const {
        isFetching: isFetchingQuestionSet,
        isLoading: isLoadingQuestionSet
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined
    });

    const foundQuestionSetId = questionSetId !== undefined;

    if (!foundQuestionSetId) {
        return (
            <View>questionSetIds 里找不到第{questionSetIndex}个 element</View>
        );
    }

    const showBtnArea = !isLoadingQuestionSet;
    const showQuestionSet = foundQuestionSetId;
    const disableBtnArea = isFetchingQuestionSet;

    const handleToLast = () => {
        const lastQuestionSetIndex = questionSetIndex - 1;
        dispatch(notebookQuestionSetIndexChanged(lastQuestionSetIndex));
    };

    const handleToNext = () => {
        const nextQuestionSetIndex = questionSetIndex + 1;
        dispatch(notebookQuestionSetIndexChanged(nextQuestionSetIndex));
    };

    const handleFinish = () => {
        Taro.redirectTo({ url: routes.notebookPage(notebookId) });
    };

    return (
        <View>
            {showQuestionSet && (
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.Notebook}
                />
            )}

            {showBtnArea && (
                <QuestionSetListOperator
                    index={questionSetIndex}
                    questionSetCount={questionSets.length}
                    disabled={disableBtnArea}
                    onToLast={handleToLast}
                    onToNext={handleToNext}
                    onFinish={handleFinish}
                />
            )}
        </View>
    );
}
