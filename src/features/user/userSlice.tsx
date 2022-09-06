import { getErrorMessage } from '@/utils/errorHandler'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'
import type { AppThunk, RootState } from '../../store/store'
import storageService from '../../utils/storageService'
import { showLoginFailureModal } from './showLoginFailureModal'
import {  userApi } from './userService'

export interface UserSliceState {
    token: string | null
    displayId: string | null
    isLoginFailure: boolean | null
}

const initialState: UserSliceState = {
    token: null,
    displayId: null,
    isLoginFailure: null
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload
        },
        setDisplayId: (state, action: PayloadAction<string | null>) => {
            state.displayId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token
                state.displayId = payload.user.displayId
                state.isLoginFailure = false
            },
        ).addMatcher(
            userApi.endpoints.login.matchRejected,
            (state) => {
                state.isLoginFailure = true
            }
        )
    },
})

export const { setToken, setDisplayId } = userSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return state.user.token !== null
}

export default userSlice.reducer

/* thunks */
export const getLocalUserInfo = (): AppThunk => (dispatch) => {
    const result = storageService.getUserInfo()

    if (result) {
        dispatch(setToken(result.token))
        dispatch(setDisplayId(result.displayId))
    } else {
        dispatch(loginThunk());
    }
}

export const logoutThunk = (): AppThunk => async(dispatch) => {
    dispatch(setToken(null))
    dispatch(setDisplayId(null))
}

export const loginThunk = () : AppThunk => async (dispatch) => {
    let code: string
    try {
        const res = await Taro.login()
        code = res.code
    } catch (err) {
        const message = `请求微信登录code错误:${getErrorMessage(err)}`
        console.error(message)
        showLoginFailureModal(message, () =>
            dispatch(loginThunk())
        )
        return;
    }

    await dispatch(
        userApi.endpoints.login.initiate(code)
    )
}
