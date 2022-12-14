import { View, Text } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    questionSetIndexIncreased,
    initResults,
    chapterUsed,
    questionSetIndexChanged,
} from "@/features/practiceChapter/practiceChapterSlice";
import { useGetChapterQuery } from "@/features/practiceChapter/chapterSerivce";
import QuestionSetSkeleton from "@/features/questionSet/components/QuestionSetSkeleton";
import { PracticeMode } from "@/features/questionSet/questionSetTypes";
import QuestionSet from "@/features/questionSet/components/QuestionSet";
import routes from "@/routes/routes";
import QuestionSetListOperator from "@/components/QuestionSetListOperator/QuestionSetListOperator";
import { navigate } from "@/utils/navigator/navigator";
import { useGetQuestionSetLoadingInfo } from "@/features/questionSet/hooks/useGetQuestionSetLoadingInfo";
import { useChanceGuard } from "@/features/user/useChanceGuard";
import PayWall from "@/features/user/components/PayWall";
import ProgressBar from "@/components/progressBar/ProgressBar";
import styles from "./practiceChapterPage.module.scss";
import useShareQuestionSet from "@/features/questionSet/hooks/useShareQuestionSet";

export default function PracticeChapterPage() {
    const dispatch = useAppDispatch();

    const showPayWall = useChanceGuard();

    // init chapter practice
    const { chapterId, questionSetIndex } = useInitChapterPractice();

    // get question set ids
    const {
        data: chapterInfo,
        isLoading: isLoadingChapterInfo,
        isError: isQueryError,
        isSuccess: isGettingChapterInfoSuccess,
        error,
    } = useGetChapterQuery(chapterId);

    const questionSets = chapterInfo?.questionSets || [];

    // init queston set results for review feature
    useEffect(() => {
        if (isGettingChapterInfoSuccess) {
            dispatch(initResults(questionSets.length));
        }
    }, [dispatch, chapterId, isGettingChapterInfoSuccess, questionSets.length]);

    const questionSetId = questionSets[questionSetIndex];

    useShareQuestionSet(questionSetId);

    // get question set loading info
    const { isLoadingQuestionSet, isFetchingQuestionSet } =
        useGetQuestionSetLoadingInfo(questionSetId);

    // ????????????1???????????????????????????
    if (isLoadingChapterInfo) {
        return (
            <View className={styles.page}>
                <QuestionInfoSkeleton />
                <QuestionSetSkeleton />
            </View>
        );
    }

    // ????????????2????????? chapter ????????????
    if (isQueryError) {
        return (
            <View className={styles.page}>
                <Text>?????? chapter ???????????????{JSON.stringify(error)}</Text>;
            </View>
        );
    }

    // ????????????3???????????? chapter.questionSetIds ????????? index ????????? questionSetId
    if (questionSetId === undefined) {
        return (
            <View className={styles.page}>
                <Text>
                    ????????????chapter.questionSetIds ???????????????{questionSetIndex}
                    ??? element
                </Text>
            </View>
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
        <View className={styles.page}>
            {showPayWall && <PayWall />}

            <ProgressBar pct={(questionSetIndex + 1) / questionSets.length} />

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
                    progress={`${questionSetIndex + 1}/${questionSets.length}`}
                />
            )}

            {showBtnArea && (
                <QuestionSetListOperator
                    index={questionSetIndex}
                    questionSetCount={questionSets.length}
                    disabled={disableBtnArea}
                    nextQuestionSetId={questionSets[questionSetIndex + 1]}
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
            <View
                style={{ width: "15%" }}
                className="skeleton skeleton-text"
            ></View>
        </View>
    );
}

function ChapterInfo({ title, desc }: { title: string; desc?: string }) {
    return (
        <View className={styles.chapterMeta}>
            <View className={styles.chapterTitle}>{title}</View>
            {desc && <View className={styles.chapterDesc}>{desc}</View>}
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
        dispatch(questionSetIndexChanged(index));
    }, [dispatch]);

    const questionSetIndex = useAppSelector(
        (state) => state.practiceChapter.questionSetIndex
    );

    return {
        chapterId,
        questionSetIndex,
    };
}
