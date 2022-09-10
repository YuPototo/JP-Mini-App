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
        setQuestionSetIndex: (state, { payload }: PayloadAction<number>) => {
            state.questionSetIndex = payload
        },
        incQuestionSetIndex: (state, {payload}: PayloadAction<number>) => {
            state.questionSetIndex += payload
        },
        setChapterId: (state, { payload }: PayloadAction<string>) => {
            state.chapterId = payload
        },
        initResults: (state, { payload }: PayloadAction<number>) => {
            state.results = Array(payload).fill(Result.NoRecord)
        },
        setResult: (
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

export const { setResult, initResults, setChapterId, setQuestionSetIndex, incQuestionSetIndex } =
    practiceChapterSlice.actions

// selectors
export const selectChapterId = (state: RootState) =>
    state.practiceChapter.chapterId


export default practiceChapterSlice.reducer
