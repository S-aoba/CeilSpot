import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { AppState, setEditedUserInfo } from '../../../../slices/appSlice'
import { UserInfo } from '../../../../types/types'

export const SetRegisteredUserInfo = (
  id: string,
  username: string,
  self_introduction: string,
  twitter: string,
  github: string,
  website: string,
  dispatch: ThunkDispatch<
    {
      app: AppState
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