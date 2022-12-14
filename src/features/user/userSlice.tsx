import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {  RootState } from '../../store/store'
import {  userApi } from './userService'

export interface UserSliceState {
    token: string | null
    displayId: string | null
    isLoginFailure: boolean | null
    quizChance: number // 做题机会
    isMember: boolean
    memberDays?: number
}

const initialState: UserSliceState = {
    token: null,
    displayId: null,
    isLoginFailure: null,
    quizChance: 0,
    isMember: false,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userLoggedIn: (state, {payload}: PayloadAction<{token: string, displayId: string}>) => {
            state.token = payload.token
            state.displayId = payload.displayId
        },
        userLoggedOut: (state) => {
            state.token = null
            state.displayId = null
        },
        rewardAdWatched: (state) => {
            state.quizChance += 5 // 默认奖励5个题目
        },
        quizChanceConsumed: (state) => {
            state.quizChance = state.quizChance - 1 < 0 ? 0: state.quizChance - 1;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token
                state.displayId = payload.user.displayId
                state.isLoginFailure = false
            },
        )
        .addMatcher(
            userApi.endpoints.login.matchRejected,
            (state) => {
                state.isLoginFailure = true
            }
        )
        .addMatcher(
            userApi.endpoints.getUser.matchFulfilled,
            (state, { payload }) => {
                state.quizChance = payload.quizChance
                state.isMember = payload.isMember
                if ( payload.memberDays) {
                    state.memberDays = payload.memberDays
                }
   
            },
        )
    },
})

export const { userLoggedIn, userLoggedOut,rewardAdWatched, quizChanceConsumed } = userSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return state.user.token !== null
}

export default userSlice.reducer

