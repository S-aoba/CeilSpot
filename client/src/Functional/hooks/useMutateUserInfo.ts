import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { resetEditedQuestion, resetEditedUserInfo, selectUserInfo, toggleCsrfState } from '../../slices/appSlice'
import { UserInfo } from '../../types/types'
import { useToastify } from './useToastify'

export const useMutateUserInfo = () => {
  const editedUserInfo = useAppSelector(selectUserInfo)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { toastInfo } = useToastify()
  const updateUserInfoMutation = useMutation(
    (user: UserInfo) =>
      axios.put<UserInfo>(
        `${import.meta.env.VITE_API_URL}/user/${user.id}`,
        {
          username: user.username,
          self_introduction: user.self_introduction,
          twitter: user.twitter,
          github: user.github,
          website: user.website,
        },
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res, variables) => {
        dispatch(resetEditedUserInfo())
        queryClient.invalidateQueries(['userInfo'])
        queryClient.invalidateQueries('user')
        toastInfo('プロフィールが変更されました。')
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedQuestion())
          navigate('/')
        }
      },
    }
  )

  const changeUsernameMutation = useMutation(
    (id: string) =>
      axios.put(
        `${import.meta.env.VITE_API_URL}/username/${id}`,
        {
          username: editedUserInfo.username,
        },
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: () => {
        dispatch(resetEditedUserInfo())
        queryClient.invalidateQueries(['userInfo'])
        queryClient.invalidateQueries(['user'])
        queryClient.invalidateQueries(['questions'])
        queryClient.invalidateQueries(['userAnswer'])
        toastInfo('ユーザーネームが変更されました。')
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedQuestion())
          navigate('/')
        }
      },
    }
  )
  return { updateUserInfoMutation, changeUsernameMutation }
}
