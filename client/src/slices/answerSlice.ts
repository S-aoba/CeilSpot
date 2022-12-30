import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { AnswerType } from '../types'

export interface AnswerState {
  editedAnswer: AnswerType
}

const initialState: AnswerState = {
  editedAnswer: {
    id: '',
    body: '',
    question_id: '',
    respondent_username: '',
  },
}

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setEditedAnswer: (state, action: PayloadAction<AnswerType>) => {
      state.editedAnswer = action.payload
    },
    resetEditedAnswer: (state) => {
      state.editedAnswer = initialState.editedAnswer
    },
  },
})

export const { setEditedAnswer, resetEditedAnswer } = answerSlice.actions

export const selectAnswer = (state: RootState): AnswerType => state.answer.editedAnswer

export default answerSlice.reducer
