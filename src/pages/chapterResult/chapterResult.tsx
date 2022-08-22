import { View, Text } from "@tarojs/components";
import { useRouter, navigateTo } from "@tarojs/taro";
import { useAppSelector } from "@/store/hooks";
import { selectNextInfo } from "@/features/books/booksService";
import { useEffect } from "react";
import ResultBall from "@/features/practiceChapter/ResultBall";
import pageNames from "@/routes/pageNames";

export default function chapterResult() {
    const router = useRouter();

    const { chapterId } = router.params as { chapterId: string };

    const results = useAppSelector(state => state.practiceChapter.results);
    const bookId = useAppSelector(state => state.bookList.currentBookId);

    // const nextInfo = useAppSelector(selectNextInfo(bookId, chapterId));

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
                            url: `${pageNames.practiceReview}?questionSetId=${result.questionSetId}`
                        })
                    }
                >
                    <ResultBall questionSetResult={result} index={index} />
                </View>
            ))}
        </View>
    );
}
