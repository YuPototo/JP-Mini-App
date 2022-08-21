import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { splitApi } from "./query/splitApi";

import bookListReducer from "../features/books/booksSlice";
import practiceChapterReducer from "../features/practiceChapter/practiceChapterSlice";
import questionSetReducer from "../features/questionSet/questionSetSlice";

const rootReducer = combineReducers({
    [splitApi.reducerPath]: splitApi.reducer,
    bookList: bookListReducer,
    practiceChapter: practiceChapterReducer,
    questionSet: questionSetReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(splitApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
