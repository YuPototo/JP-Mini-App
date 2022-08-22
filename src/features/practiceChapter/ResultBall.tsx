import { View } from '@tarojs/components'
import { Result } from './practiceChapterSlice'
import type { QuestionSetResult } from './practiceChapterTypes'

type Props = {
    questionSetResult: QuestionSetResult
    index: number
}

export default function ResultBall({ questionSetResult, index }: Props) {
    const { result } = questionSetResult

    const backgroundColor = {
        [Result.Right]: '#00b300',
        [Result.Wrong]: '#b30000',
        [Result.NoRecord]: '#b3b3b3',
    }

    return (
        <View

            style={{backgroundColor: backgroundColor[result]}}
        >
            {index + 1}
        </View>
    )
}
