import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/app/hooks'
import { toggleCsrfState } from '../../../store/slices/csrfSlice'
import { resetEditedQuestion } from '../../../store/slices/questionSlice'
import { User } from '../../../types'
import { useToastify } from '../../toastify/useToastify'

export const useMutateAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toastInfo } = useToastify()

  const loginMutation = useMutation(
    async (user: User) => await axios.post(`${import.meta.env.VITE_API_URL}/login`, user, { withCredentials: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
        queryClient.invalidateQueries(['auth'])
        navigate('/')
        toastInfo('ログインしました。')
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
        }
      },
    }
  )
  const registerMutation = useMutation(
    async (user: User) => await axios.post(`${import.meta.env.VITE_API_URL}/register`, user),
    {
      onSuccess: () => {
        toastInfo('アカウントの作成に成功しました')
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
        }
      },
    }
  )
  const logoutMutation = useMutation(async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    ),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['auth'])
          navigate('/')
        },
        onError: (err: any) => {
          alert(`${err.response.data.detail}\n${err.message}`)
          if (err.response.data.detail === 'The CSRF token has expired.') {
            dispatch(toggleCsrfState())
            dispatch(resetEditedQuestion())
            navigate('/')
          }
        },
      }
  })
  return { loginMutation, registerMutation, logoutMutation }
}
