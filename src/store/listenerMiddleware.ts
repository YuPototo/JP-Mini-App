// https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage

import { addQuestionSetListeners } from '@/features/questionSet/questionSetSlice'
import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from './store'
import { addOrderListeners } from '@/features/order/orderSlice'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
    listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<
    RootState,
    AppDispatch
>

export default listenerMiddleware

addQuestionSetListeners(startAppListening)
addOrderListeners(startAppListening)
