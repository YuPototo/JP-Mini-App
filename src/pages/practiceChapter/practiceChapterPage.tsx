import { View, Text } from "@tarojs/components";
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
import routes from "@/routes/routes";
import { useGetQuestionSetQuery } from "@/features/questionSet/questionSetService";
import QuestionSetListOperator from "@/components/QuestionSetListOperator/QuestionSetListOperator";
import { navigate } from "@/utils/navigator/navigator";

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
        navigate(routes.chapterResult(chapterId), { method: "redirectTo" });
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
                <QuestionSetListOperator
                    index={questionSetIndex}
                    questionSetCount={questionSets.length}
                    disabled={disableBtnArea}
                    onToLast={() => dispatch(questionSetIndexIncreased(-1))}
                    onToNext={() => dispatch(questionSetIndexIncreased(1))}
                    onFinish={handleFinishChapter}
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
