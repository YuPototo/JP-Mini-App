import { useGetQuestionSetQuery } from "../questionSetService";
import QuestionSetSkeleton from "./QuestionSetSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    selectIsRight,
    selectIsDone,
    initQuestionSet,
    setIsError
} from "../questionSetSlice";
import { useEffect } from "react";
import { PracticeMode } from "../questionSetTypes";
import Body from "./Body";
import Questions from "./Questions";
import Explanation from "./Explanation";
import AudioPlayer from "./AudioPlayer";
import { View } from "@tarojs/components";
import Transcription from "./Transcription";

type Props = {
    questionSetId: string;
    practiceMode: PracticeMode;
};

export default function QuestionSet({ questionSetId, practiceMode }: Props) {
    const {
        data: questionSet,
        isLoading, // 第1次请求
        isFetching, // 正在请求
        isError,
        error
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initQuestionSet({ questionSetId, practiceMode }));
    }, [questionSetId, dispatch, practiceMode]);

    // set error
    useEffect(() => {
        isError && dispatch(setIsError(isError));
    }, [isError, dispatch]);

    const isDone = useAppSelector(selectIsDone);
    const isRight = useAppSelector(selectIsRight);

    // 仅在第一次加载时显示 skeleton
    if (isLoading) return <QuestionSetSkeleton />;

    if (isError) {
        return <View>error: {JSON.stringify(error)}</View>;
    }

    return (
        <View style={{ backgroundColor: isFetching ? "lightBlue" : "" }}>
            {questionSet ? (
                <>
                    <Body body={questionSet.body} />
                    <Questions questions={questionSet.questions} />
                    <Explanation explanation={questionSet.explanation} />
                    {questionSet.audio && (
                        <AudioPlayer audio={questionSet.audio} />
                    )}
                    {isDone && (
                        <Transcription
                            transcription={questionSet.audio?.transcription}
                        />
                    )}
                    {isDone &&
                        (isRight ? <View>正确</View> : <View>错误</View>)}
                </>
            ) : (
                <View>
                    出错了：questionSet 是 undefined。你不应该看到这些文字。
                </View>
            )}
        </View>
    );
}
