import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { resetEditedQuestion, resetEditedUserInfo, toggleCsrfState } from '../../../slices/appSlice'
import { QuestionType, UserInfo } from '../types/types'
import { useToastify } from './useToastify'

export const useMutateUser = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { toastInfo } = useToastify()
  const updateUserInfoMutation = useMutation(
    (user: UserInfo) =>
      axios.put<UserInfo>(
        `${import.meta.env.VITE_API_URL}/user/${user.username}`,
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
        toastInfo('更新しました')
        queryClient.invalidateQueries(['user'])
        // queryClient.invalidateQueries(['userQuestions'])
        navigate('/')
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
  return { updateUserInfoMutation }
}
