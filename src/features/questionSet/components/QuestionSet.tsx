import { useGetQuestionSetQuery } from "../questionSetService";
import QuestionSetSkeleton from "./QuestionSetSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    selectIsDone,
    newQuestionSetInitiated,
    errorOccured,
} from "../questionSetSlice";
import { useEffect } from "react";
import { PracticeMode } from "../questionSetTypes";
import Body from "./Body";
import Questions from "./Questions";
import Explanation from "./Explanation";
import AudioPlayer from "./AudioPlayer";
import { View } from "@tarojs/components";
import Transcription from "./Transcription";
import FavButton from "@/features/notebook/components/FavButton";
import styles from "./QuestionSet.module.scss";

type Props = {
    questionSetId: string;
    practiceMode: PracticeMode;
};

export default function QuestionSet({ questionSetId, practiceMode }: Props) {
    const {
        data,
        isLoading, // 第1次请求
        isFetching, // 正在请求
        isError,
        error,
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined,
    });

    const { questionSet, isFav } = data || {};

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(newQuestionSetInitiated({ questionSetId, practiceMode }));
    }, [questionSetId, dispatch, practiceMode]);

    // set error
    useEffect(() => {
        isError && dispatch(errorOccured(isError));
    }, [isError, dispatch]);

    const isDone = useAppSelector(selectIsDone);

    // 仅在第一次加载时显示 skeleton
    if (isLoading) return <QuestionSetSkeleton />;

    if (isError) {
        return <View>error: {JSON.stringify(error)}</View>;
    }

    return (
        <View
            style={{ backgroundColor: isFetching ? "lightBlue" : "" }}
            className={styles.questionSet}
        >
            {questionSet ? (
                <>
                    <View className={styles.questionSetBody}>
                        <Body body={questionSet.body} />
                    </View>

                    <View style={{ marginTop: "32rpx", marginBottom: "60rpx" }}>
                        <Questions
                            questions={questionSet.questions}
                            isDone={isDone}
                        />
                    </View>

                    {isDone && (
                        <Explanation explanation={questionSet.explanation} />
                    )}

                    {questionSet.audio && (
                        <AudioPlayer audio={questionSet.audio} />
                    )}

                    {isDone && (
                        <Transcription
                            transcription={questionSet.audio?.transcription}
                        />
                    )}

                    {isDone && (
                        <FavButton
                            isFav={isFav}
                            questionSetId={questionSetId}
                        />
                    )}
                </>
            ) : (
                <View>
                    出错了：questionSet 是 undefined。你不应该看到这些文字。
                </View>
            )}
        </View>
    );
}
