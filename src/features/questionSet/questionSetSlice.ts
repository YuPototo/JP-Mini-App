import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { questionSetApi } from "./questionSetService";
import { PracticeMode, QuestionSetState } from "./questionSetTypes";
import { AppStartListening } from "../../store/listenerMiddleware";
import { finishChapterQuestionSet } from "../practiceChapter/practiceChapterThunks";
import { finishNotebookQuestionSet } from "../notebook/notebookSlice";
import { removeWrongRecord } from "../wrongRecord/wrongRecordService";

const initialState: QuestionSetState = {
    questionSetId: null,
    practiceMode: null,
    optionsSelected: [],
    isError: false
};

export const questionSetSlice = createSlice({
    name: "questionSet",
    initialState,
    reducers: {
        newQuestionSetInitiated: (
            state,
            {
                payload
            }: PayloadAction<{
                questionSetId: string;
                practiceMode: PracticeMode;
            }>
        ) => {
            state.questionSetId = payload.questionSetId;
            state.practiceMode = payload.practiceMode;
            state.optionsSelected = [];
            state.isError = false;
        },
        optionSelected: (
            state,
            action: PayloadAction<{
                questionIndex: number;
                optionIndex: number;
            }>
        ) => {
            const { questionIndex, optionIndex } = action.payload;
            state.optionsSelected[questionIndex] = optionIndex;
        },
        answerShown: (
            state,
            { payload }: PayloadAction<{ questionLength: number }>
        ) => {
            state.optionsSelected = Array(payload.questionLength).fill(-1);
        },
        errorOccured: (state, { payload }: PayloadAction<boolean>) => {
            state.isError = payload;
        }
    }
});

export const {
    optionSelected,
    answerShown,
    newQuestionSetInitiated,
    errorOccured
} = questionSetSlice.actions;

/* selectors */
export const selectPickedIndex = (questionIndex: number) => (
    state: RootState
) => {
    return state.questionSet.optionsSelected[questionIndex];
};

export const selectCurrentQuestionSet = (state: RootState) => {
    const { questionSetId } = state.questionSet;

    if (!questionSetId) {
        return;
    }

    const { data } = questionSetApi.endpoints.getQuestionSet.select(
        questionSetId
    )(state);

    return data?.questionSet;
};

// ????????? questionSet ??????????????? questions
export const selectQuetionsLength = (state: RootState) => {
    const questionSet = selectCurrentQuestionSet(state);

    if (!questionSet) {
        return;
    }

    return questionSet.questions.length;
};

export const selectIsRight = (state: RootState) => {
    const questionSet = selectCurrentQuestionSet(state);

    if (!questionSet) {
        return false;
    }

    const { optionsSelected } = state.questionSet;

    if (optionsSelected.length !== questionSet.questions.length) {
        return false;
    }

    return optionsSelected.every((optionIndex, index) => {
        const question = questionSet.questions[index];
        if (!question) {
            return false;
        }
        return optionIndex === question.answer;
    });
};

export const selectIsDone = (state: RootState) => {
    const questionSet = selectCurrentQuestionSet(state);

    if (!questionSet) {
        return false;
    }
    const { optionsSelected } = state.questionSet;
    const nonEmptySelection = optionsSelected.filter(el => el !== null); // ???????????????????????? empty element
    return nonEmptySelection.length === questionSet.questions.length;
};

export default questionSetSlice.reducer;

/* listenerMiddleware */

export const addQuestionSetListeners = (startListening: AppStartListening) => {
    startListening({
        actionCreator: optionSelected,
        effect: (_, { getState, dispatch }) => {
            const state = getState();
            const isDone = selectIsDone(state);
            if (!isDone) return;

            // set result
            const isRight = selectIsRight(state);
            const questionSetId = selectCurrentQuestionSet(state)?.id;

            if (!questionSetId) {
                console.error("questionSetId ??? undefined");
                return;
            }

            const practiceMode = state.questionSet.practiceMode;

            switch (practiceMode) {
                case PracticeMode.Chapter:
                    dispatch(
                        finishChapterQuestionSet({ questionSetId, isRight })
                    );
                    break;
                case PracticeMode.Notebook:
                    dispatch(finishNotebookQuestionSet(questionSetId));
                    break;
                case PracticeMode.WrongRecord:
                    isRight && dispatch(removeWrongRecord(questionSetId));
                    break;
                default:
                    console.log(`unhandled practice mode: ${practiceMode}`);
            }
        }
    });
};
