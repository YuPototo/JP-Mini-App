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
import QuestionSetListOperator from "@/components/QuestionSetListOperator/QuestionSetListOperator";
import { navigate } from "@/utils/navigator/navigator";
import { useGetQuestionSetLoadingInfo } from "@/features/questionSet/hooks/useGetQuestionSetLoadingInfo";

export default function PracticeChapterPage() {
    const dispatch = useAppDispatch();

    // init chapter practice
    const { chapterId, questionSetIndex } = useInitChapterPractice();

    // get question set ids
    const {
        data: chapterInfo,
        isLoading: isLoadingChapterInfo,
        isError: isQueryError,
        isSuccess: isGettingChapterInfoSuccess,
        error
    } = useGetChapterQuery(chapterId);

    const questionSets = chapterInfo?.questionSets || [];

    // init queston set results for review feature
    useEffect(() => {
        if (isGettingChapterInfoSuccess) {
            dispatch(initResults(questionSets.length));
        }
    }, [dispatch, chapterId, isGettingChapterInfoSuccess, questionSets.length]);

    const questionSetId = questionSets[questionSetIndex];

    // get question set loading info
    const {
        isLoadingQuestionSet,
        isFetchingQuestionSet
    } = useGetQuestionSetLoadingInfo(questionSetId);

    // 页面状态1：正在加载章节信息
    if (isLoadingChapterInfo) {
        return (
            <>
                <QuestionInfoSkeleton />
                <QuestionSetSkeleton />
            </>
        );
    }

    // 页面状态2：加载 chapter 信息失败
    if (isQueryError) {
        return <Text>获取 chapter 信息出错：{JSON.stringify(error)}</Text>;
    }

    // 页面状态3：无法从 chapter.questionSetIds 里获取 index 对应的 questionSetId
    if (questionSetId === undefined) {
        return (
            <Text>
                出错了：chapter.questionSetIds 里找不到第{questionSetIndex}个
                element
            </Text>
        );
    }

    const showBtnArea = isGettingChapterInfoSuccess && !isLoadingQuestionSet;
    const showChapterInfo = chapterInfo && questionSetIndex === 0;
    const showQuestionSet =
        isGettingChapterInfoSuccess && questionSetId !== undefined;
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

/**
 * Init chapter pracitce
 */
function useInitChapterPractice() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { chapterId, startingIndex } = router.params as {
        chapterId: string;
        startingIndex: string;
    };

    const index = parseInt(startingIndex);

    useEffect(() => {
        dispatch(chapterUsed(chapterId));
    }, [chapterId, dispatch]);

    useEffect(() => {
        dispatch(questionSetChanged(index));
    }, [dispatch]);

    const questionSetIndex = useAppSelector(
        state => state.practiceChapter.questionSetIndex
    );

    return {
        chapterId,
        questionSetIndex
    };
}
