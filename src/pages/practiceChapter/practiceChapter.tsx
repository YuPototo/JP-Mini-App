import { Button, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    incQuestionSetIndex,
    setChapterId,
    setQuestionSetIndex
} from "@/features/practiceChapter/practiceChapterSlice";
import { useGetChapterQuery } from "@/features/practiceChapter/chapterSerivce";
import QuestionSetSkeleton from "@/features/questionSet/components/QuestionSetSkeleton";
import { PracticeMode } from "@/features/questionSet/questionSetTypes";
import QuestionSet from "@/features/questionSet/components/QuestionSet";
import {
    fillOptionsThunk,
    selectIsDone
} from "@/features/questionSet/questionSetSlice";
import Taro from "@tarojs/taro";
import routes from "@/routes/routes";

export default function PracticeChapterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    /** tech debt
     * * 移除 as keyword
     */
    const { chapterId } = router.params as { chapterId: string };

    useEffect(() => {
        dispatch(setChapterId(chapterId));
    }, [chapterId, dispatch]);

    useEffect(() => {
        dispatch(setQuestionSetIndex(0));
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

    const isDone = useAppSelector(selectIsDone);
    const isQuestionSetError = useAppSelector(
        state => state.questionSet.isError
    );

    const questionSets = chapterInfo?.questionSets || [];

    const questionSetId = questionSets[questionSetIndex];

    const handleFinishChapter = () => {
        Taro.redirectTo({
            url: routes.chapterResult(chapterId)
        });
    };

    if (isQueryError) {
        return <div>出错了：{JSON.stringify(error)}</div>;
    }

    return (
        <View>
            <ChapterTitle
                isLoading={isLoadingChapterInfo}
                title={chapterInfo?.title}
            />
            <ChapterDesc
                isLoading={isLoadingChapterInfo}
                desc={chapterInfo?.desc}
            />

            {isLoadingChapterInfo && <QuestionSetSkeleton />}

            {isQuerySuccess &&
                (questionSetId ? (
                    <QuestionSet
                        questionSetId={questionSetId}
                        practiceMode={PracticeMode.Chapter}
                    />
                ) : (
                    <div>
                        出错了：chapter 内没有第{questionSetIndex}个 question
                        set id
                    </div>
                ))}

            {noLastQuestionSet(questionSetIndex) || (
                <Button onClick={() => dispatch(incQuestionSetIndex(-1))}>
                    上一题
                </Button>
            )}

            {isDone || (
                <Button onClick={() => dispatch(fillOptionsThunk())}>
                    答案
                </Button>
            )}

            {showNextBtn(isDone, isQuestionSetError) &&
                hasNextQuestionSet(questionSetIndex, questionSets) && (
                    <Button onClick={() => dispatch(incQuestionSetIndex(1))}>
                        下一题
                    </Button>
                )}

            {showNextBtn(isDone, isQuestionSetError) &&
                isLastQuestionSet(questionSetIndex, questionSets) && (
                    <Button onClick={handleFinishChapter}>完成本章</Button>
                )}
        </View>
    );
}

function ChapterTitle({
    isLoading,
    title
}: {
    isLoading: boolean;
    title?: string;
}) {
    if (isLoading) {
        return <View>Todo: skeleton</View>;
    }

    return <View>{title}</View>;
}

function ChapterDesc({
    isLoading,
    desc
}: {
    isLoading: boolean;
    desc?: string;
}) {
    if (isLoading) {
        return <View>todo: loading skeleton</View>;
    }

    if (desc) {
        return <View>{desc}</View>;
    }

    return <></>;
}

function noLastQuestionSet(qSetIndex: number) {
    return qSetIndex === 0;
}

function hasNextQuestionSet(qSetIndex: number, questionSets: string[]) {
    return qSetIndex < questionSets.length - 1;
}

function isLastQuestionSet(qSetIndex: number, questionSets: string[]) {
    return qSetIndex === questionSets.length - 1;
}

function showNextBtn(isDone: boolean, isQuestionSetError: boolean) {
    if (isQuestionSetError) return true;
    return isDone;
}
