import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../store/app/hooks'
import { toggleCsrfState } from '../../../store/slices/csrfSlice'
import { resetEditedQuestion } from '../../../store/slices/questionSlice'
import { resetEditedUserInfo, selectUserInfo } from '../../../store/slices/userInfoSlice'
import { UserInfo } from '../../../types'
import { useToastify } from '../../toastify/useToastify'

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
        toastInfo('プロフィールが変更されました。')
      },
      onError: (err: any) => {
        toastInfo(`${err.response.data.detail}\n${err.message}`)
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

  const renameUsernameMutation = useMutation(
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
      onSuccess: (res) => {
        dispatch(resetEditedUserInfo())
        queryClient.invalidateQueries(['user'])
        queryClient.invalidateQueries(['userInfo'])
        queryClient.invalidateQueries(['questions'])
        queryClient.invalidateQueries(['singleQuestion'])
        queryClient.invalidateQueries(['singleAnswer'])
        navigate('/dashboard/profile', { state: res.data.id })
        toastInfo('ユーザーネームが変更されました。')
      },
      onError: (err: any) => {
        toastInfo(`${err.response.data.detail}\n${err.message}`)
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
  return { updateUserInfoMutation, renameUsernameMutation }
}
