import { Button, View, Text } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    questionSetIndexIncreased,
    initResults,
    chapterUsed,
    questionSetChanged
} from "@/features/practiceChapter/practiceChapterSlice";
import { useGetChapterQuery } from "@/features/practiceChapter/chapterSerivce";
import QuestionSetSkeleton from "@/features/questionSet/components/QuestionSetSkeleton";
import { PracticeMode } from "@/features/questionSet/questionSetTypes";
import QuestionSet from "@/features/questionSet/components/QuestionSet";
import { selectIsDone } from "@/features/questionSet/questionSetSlice";
import Taro from "@tarojs/taro";
import routes from "@/routes/routes";
import { useGetQuestionSetQuery } from "@/features/questionSet/questionSetService";
import { showAnswer } from "@/features/questionSet/questionSetThunks";

export default function PracticeChapterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // tech debt：移除 as
    const { chapterId } = router.params as { chapterId: string };

    useEffect(() => {
        dispatch(chapterUsed(chapterId));
    }, [chapterId, dispatch]);

    useEffect(() => {
        dispatch(questionSetChanged(0));
    }, [dispatch]);

    const {
        data: chapterInfo,
        isLoading: isLoadingChapterInfo,
        isError: isQueryError,
        isSuccess: isQuerySuccess,
        error
    } = useGetChapterQuery(chapterId);

    const questionSetIndex = useAppSelector(
        state => state.practiceChapter.questionSetIndex
    );

    const questionSets = chapterInfo?.questionSets || [];
    const questionSetId = questionSets[questionSetIndex];

    // init results
    useEffect(() => {
        if (isQuerySuccess) {
            dispatch(initResults(questionSets.length));
        }
    }, [dispatch, chapterId, isQuerySuccess, questionSets.length]);

    const {
        isFetching: isFetchingQuestionSet,
        isLoading: isLoadingQuestionSet
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined
    });

    if (isLoadingChapterInfo) {
        return (
            <>
                <QuestionInfoSkeleton />

                <QuestionSetSkeleton />
            </>
        );
    }

    if (isQueryError) {
        return <Text>获取 chapter 信息出错：{JSON.stringify(error)}</Text>;
    }

    const foundQuestionSetId = questionSetId !== undefined;

    if (!foundQuestionSetId) {
        return (
            <Text>
                出错了：chapter.questionSetIds 里找不到第{questionSetIndex}个
                element
            </Text>
        );
    }

    const showBtnArea = isQuerySuccess && !isLoadingQuestionSet;
    const showChapterInfo = chapterInfo && questionSetIndex === 0;
    const showQuestionSet = isQuerySuccess && foundQuestionSetId;
    const disableBtnArea = isFetchingQuestionSet;

    const handleFinishChapter = () => {
        Taro.redirectTo({
            url: routes.chapterResult(chapterId)
        });
    };

    return (
        <View>
            {showChapterInfo && (
                <ChapterInfo
                    title={chapterInfo.title}
                    desc={chapterInfo.desc}
                />
            )}

            {showQuestionSet && (
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.Chapter}
                />
            )}

            {showBtnArea && (
                <OperationArea
                    questionSetIndex={questionSetIndex}
                    questionSets={questionSets}
                    disabled={disableBtnArea}
                    handleFinishChapter={handleFinishChapter}
                />
            )}
        </View>
    );
}

function QuestionInfoSkeleton() {
    return (
        <View>
            <Text>Question Info Skeleton: todo</Text>
        </View>
    );
}

function ChapterInfo({ title, desc }: { title: string; desc?: string }) {
    return (
        <View>
            <Text>{title}</Text>
            {desc && <Text>{desc}</Text>}
        </View>
    );
}

function OperationArea({
    questionSetIndex,
    questionSets,
    disabled,
    handleFinishChapter
}: {
    questionSetIndex: number;
    questionSets: string[];
    disabled: boolean;
    handleFinishChapter: () => void;
}) {
    const dispatch = useAppDispatch();
    const isDone = useAppSelector(selectIsDone);

    const isQuestionSetError = useAppSelector(
        state => state.questionSet.isError
    );

    const hasNext = questionSetIndex < questionSets.length - 1;
    const hasPreviousQuestionSet = questionSetIndex > 0;

    const handleToNext = () => dispatch(questionSetIndexIncreased(1));

    const handleContinue = () => {
        hasNext ? handleToNext() : handleFinishChapter();
    };

    return (
        <>
            {hasPreviousQuestionSet && (
                <Button
                    onClick={() => dispatch(questionSetIndexIncreased(-1))}
                    disabled={disabled}
                >
                    上一题
                </Button>
            )}

            {isDone || (
                <Button
                    onClick={() => dispatch(showAnswer())}
                    disabled={disabled}
                >
                    答案
                </Button>
            )}

            {showNextBtn(isDone, isQuestionSetError) && (
                <Button onClick={handleContinue} disabled={disabled}>
                    {hasNext ? "下一题" : "完成本节"}
                </Button>
            )}
        </>
    );
}

function showNextBtn(isDone: boolean, isQuestionSetError: boolean) {
    if (isQuestionSetError) return true;
    return isDone;
}
