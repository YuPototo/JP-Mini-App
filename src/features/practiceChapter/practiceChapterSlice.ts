import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'
import { PracticeChapterState } from './practiceChapterTypes'

export enum Result {
    Right,
    Wrong,
    NoRecord,
}


const initialState: PracticeChapterState = {
    chapterId: null,
    results: [],
    questionSetIndex: 0
}

export const practiceChapterSlice = createSlice({
    name: 'practiceChapter',
    initialState,
    reducers: {
        questionSetIndexChanged: (state, { payload }: PayloadAction<number>) => {
            state.questionSetIndex = payload
        },
        questionSetIndexIncreased: (state, {payload}: PayloadAction<number>) => {
            state.questionSetIndex += payload
        },
        chapterUsed: (state, { payload }: PayloadAction<string>) => {
            state.chapterId = payload
        },
        initResults: (state, { payload }: PayloadAction<number>) => {
            state.results = Array(payload).fill(Result.NoRecord)
        },
        resultChanged: (
            state,
            {
                payload,
            }: PayloadAction<{
                questionSetIndex: number
                questionSetId: string
                result: Result
            }>
        ) => {
            const { questionSetIndex, questionSetId, result } = payload
            state.results[questionSetIndex] = { questionSetId, result }
        },
    },
})

export const { resultChanged, initResults, chapterUsed, questionSetIndexChanged, questionSetIndexIncreased } =
    practiceChapterSlice.actions

// selectors
export const selectChapterId = (state: RootState) =>
    state.practiceChapter.chapterId


export default practiceChapterSlice.reducer
