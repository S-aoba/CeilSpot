import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import questionReducer from '../slices/questionSlice'
import answerReducer from '../slices/answerSlice'
import userInfoReducer from '../slices/userInfoSlice'
import csrfReducer from '../slices/csrfSlice'
import menuBarReducer from '../slices/menuBarSlice'

export const store = configureStore({
  reducer: {
    question: questionReducer,
    answer: answerReducer,
    userInfo: userInfoReducer,
    csrf: csrfReducer,
    menuBar: menuBarReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
