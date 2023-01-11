import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { setEditedUserInfo, UserInfoState } from '../../../../store/slices/userInfoSlice'
import { UserInfo } from '../../../../types'

export const SetRegisteredUserInfo = (
  id: string,
  username: string,
  self_introduction: string,
  twitter: string,
  github: string,
  website: string,
  dispatch: ThunkDispatch<
    {
      app: UserInfoState
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  editedUserInfo: UserInfo
) => {
  dispatch(
    setEditedUserInfo({
      ...editedUserInfo,
      id,
      username,
      self_introduction,
      twitter,
      github,
      website,
    })
  )
}
