import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { QuestionType } from '../types'

export interface QuestionState {
  editedQuestion: QuestionType
}

const initialState: QuestionState = {
  editedQuestion: {
    id: '',
    title: '',
    body: '',
    post_username: '',
    answer_list: [],
    tags: [],
  },
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setEditedQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.editedQuestion = action.payload
    },
    resetEditedQuestion: (state) => {
      state.editedQuestion = initialState.editedQuestion
    },
  },
})

export const { setEditedQuestion, resetEditedQuestion } = questionSlice.actions

export const selectQuestion = (state: RootState): QuestionType => state.question.editedQuestion

export default questionSlice.reducer
