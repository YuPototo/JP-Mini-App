import { View } from '@tarojs/components'
import { Result } from './practiceChapterSlice'
import type { QuestionSetResult } from './practiceChapterTypes'

type Props = {
    questionSetResult: QuestionSetResult
    index: number
}

export default function ResultBall({ questionSetResult, index }: Props) {
    const { result } = questionSetResult

    const backgroundColor = 'red'
    return (
        <View
            // className={clsx(
            //     'm-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full',
            //     {
            //         'bg-green-300': result === Result.Right,
            //         'bg-red-300': result === Result.Wrong,
            //         'bg-gray-300': result === Result.NoRecord,
            //     }
            // )}
            style={{backgroundColor}}
        >
            {index + 1}
        </View>
    )
}
