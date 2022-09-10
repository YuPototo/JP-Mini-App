import { View, Text, Button } from "@tarojs/components";
import { useRouter, navigateTo, redirectTo, navigateBack } from "@tarojs/taro";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    booksApi,
    NextInfoResult,
    NextInfoResultType,
    selectNextInfo
} from "@/features/books/booksService";
import { useEffect } from "react";
import ResultBall from "@/features/practiceChapter/ResultBall";
import routes from "@/routes/routes";

export default function chapterResult() {
    const router = useRouter();

    const { chapterId } = router.params as { chapterId: string };

    const results = useAppSelector(state => state.practiceChapter.results);
    const bookId = useAppSelector(state => state.books.currentBookId);

    const nextInfo = useAppSelector(selectNextInfo(bookId, chapterId));

    if (!bookId) {
        console.error("没有 bookId");
    }

    return (
        <View>
            <Text>做题结果</Text>
            {results.map((result, index) => (
                <View
                    key={index}
                    onClick={() =>
                        navigateTo({
                            url: routes.practiceReview(result.questionSetId)
                        })
                    }
                >
                    <ResultBall questionSetResult={result} index={index} />
                </View>
            ))}

            {bookId && <NextInfo nextInfo={nextInfo} bookId={bookId} />}
        </View>
    );
}

function NextInfo({
    nextInfo,
    bookId
}: {
    nextInfo: NextInfoResult;
    bookId: string;
}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (nextInfo.resultType === NextInfoResultType.NoContent) {
            dispatch(booksApi.endpoints.getBookContent.initiate(bookId));
        }
    }, [nextInfo.resultType, bookId, dispatch]);

    const toNextChapter = (chapterId: string) =>
        redirectTo({
            url: routes.practiceChapter(chapterId)
        });

    const ToBookDetailButton = (
        <Button onClick={() => navigateBack()}>返回目录</Button>
    );

    if (nextInfo.resultType === NextInfoResultType.NoContent) {
        // 不处理，等待 content 获取结果
        console.log("content 不再存在于 store 里");
        return <></>;
    }

    if (nextInfo.resultType === NextInfoResultType.Error) {
        return (
            <View>
                <Text>出错了：{nextInfo.errorMsg}</Text>
            </View>
        );
    }

    if (nextInfo.resultType === NextInfoResultType.NoNext) {
        return (
            <View>
                <View>恭喜你，完成了所有练习</View>
                {ToBookDetailButton}
            </View>
        );
    }

    if (nextInfo.resultType === NextInfoResultType.SameSection) {
        return (
            <View>
                <Text>下一节：{nextInfo.nextChapter.title}</Text>
                <Button onClick={() => toNextChapter(nextInfo.nextChapter.id)}>
                    继续做题
                </Button>
                {ToBookDetailButton}
            </View>
        );
    }

    if (nextInfo.resultType === NextInfoResultType.NextSection) {
        return (
            <View>
                <Text>
                    下一节： {nextInfo.nextSection.title} -
                    {nextInfo.nextChapter.title}
                </Text>
                <Button onClick={() => toNextChapter(nextInfo.nextChapter.id)}>
                    继续做题
                </Button>
                {ToBookDetailButton}
            </View>
        );
    }

    /** tech debt
     * 如果写下面的代码，TS 会认为这个 component 可能会返回 undefined
     */
    return (
        <View>
            <Text>出错了：不应该渲染这个部分</Text>
        </View>
    );
}
