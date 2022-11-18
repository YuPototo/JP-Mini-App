import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { splitApi } from "./query/splitApi";
import listenerMiddleware from "./listenerMiddleware";
import { authRejectionMiddleware } from "./middleware/authRejectionMiddleware";
import { queryErrorMiddleware } from "./middleware/queryErrorMiddleware";

import booksReducer from "@/features/books/booksSlice";
import practiceChapterReducer from "@/features/practiceChapter/practiceChapterSlice";
import questionSetReducer from "@/features/questionSet/questionSetSlice";
import userReduer from "@/features/user/userSlice";
import notebookReducer from "../features/notebook/notebookSlice";
import wrongRecordReducer from "../features/wrongRecord/wrongRecordSlice";
import progressReducer from "../features/progress/progressSlice";
import orderReducer from "../features/order/orderSlice";
import parameterReducer from "../features/parameter/parameterSlice";

const rootReducer = combineReducers({
    [splitApi.reducerPath]: splitApi.reducer,
    books: booksReducer,
    practiceChapter: practiceChapterReducer,
    questionSet: questionSetReducer,
    user: userReduer,
    notebook: notebookReducer,
    wrongRecord: wrongRecordReducer,
    progress: progressReducer,
    order: orderReducer,
    parameter: parameterReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware)
            .concat(
                splitApi.middleware,
                authRejectionMiddleware,
                queryErrorMiddleware
            ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>; //https://github.com/reduxjs/redux/issues/4267
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
