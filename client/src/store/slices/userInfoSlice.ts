import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { UserInfo } from '../../types'

export interface UserInfoState {
  editedUserInfo: UserInfo
}

const initialState: UserInfoState = {
  editedUserInfo: {
    id: '',
    username: '',
    self_introduction: '',
    twitter: '',
    github: '',
    website: '',
  },
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setEditedUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.editedUserInfo = action.payload
    },
    resetEditedUserInfo: (state) => {
      state.editedUserInfo = initialState.editedUserInfo
    },
  },
})

export const { setEditedUserInfo, resetEditedUserInfo } = userInfoSlice.actions

export const selectUserInfo = (state: RootState): UserInfo => state.userInfo.editedUserInfo

export default userInfoSlice.reducer
