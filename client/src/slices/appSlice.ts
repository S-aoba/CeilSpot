import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { AnswerType, MenubarTabType, QuestionType } from '../components/shared/types/types'

export interface AppState {
  editedQuestion: QuestionType
  editedAnswer: AnswerType
  csrfTokenExp: boolean
  editMode: boolean
  selectedMenubarTab: MenubarTabType
}

const initialState: AppState = {
  editedQuestion: {
    id: '',
    title: '',
    body: '',
    post_username: '',
    answer_list: [],
    tags: [],
  },
  editedAnswer: {
    id: '',
    body: '',
    question_id: '',
    respondent_username: '',
  },
  csrfTokenExp: false,
  editMode: false,
  selectedMenubarTab: 'EveryoneQuestions',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setEditedQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.editedQuestion = action.payload
    },
    resetEditedQuestion: (state) => {
      state.editedQuestion = initialState.editedQuestion
    },
    setEditedAnswer: (state, action: PayloadAction<AnswerType>) => {
      state.editedAnswer = action.payload
    },
    resetEditedAnswer: (state) => {
      state.editedAnswer = initialState.editedAnswer
    },
    toggleCsrfState: (state) => {
      state.csrfTokenExp = !state.csrfTokenExp
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode
    },
    changeMenubarTab: (state, action: PayloadAction<MenubarTabType>) => {
      state.selectedMenubarTab = action.payload
    },
  },
})

export const {
  setEditedQuestion,
  resetEditedQuestion,
  setEditedAnswer,
  resetEditedAnswer,
  toggleCsrfState,
  toggleEditMode,
  changeMenubarTab,
} = appSlice.actions

export const selectQuestion = (state: RootState): QuestionType => state.app.editedQuestion
export const selectAnswer = (state: RootState): AnswerType => state.app.editedAnswer
export const selectCsrfState = (state: RootState): boolean => state.app.csrfTokenExp
export const selectEditMode = (state: RootState): boolean => state.app.editMode
export const selectMenubarTab = (state: RootState): MenubarTabType => state.app.selectedMenubarTab

export default appSlice.reducer
