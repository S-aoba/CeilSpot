import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../app/hooks'
import { changeMenubarTab, resetEditedQuestion, toggleCsrfState } from '../../../slices/appSlice'
import { User } from '../types/types'

export const useMutateAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loginMutation = useMutation(
    async (user: User) => await axios.post(`${import.meta.env.VITE_API_URL}/login`, user, { withCredentials: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
        toast.success('ログインしました。', {
          autoClose: 2000,
          closeOnClick: true,
        })
        navigate('/')
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
        toast.success('アカウントの作成に成功しました', {
          autoClose: 2000,
          closeOnClick: true,
        })
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
    const isLogout = confirm('ログアウトしてもよろしいですか？')
    if (isLogout) {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      ),
        {
          onSuccess: () => {
            navigate('/')
          },
          onError: (err: any) => {
            alert(`${err.response.data.detail}\n${err.message}`)
            if (err.response.data.detail === 'The CSRF token has expired.') {
              dispatch(toggleCsrfState())
              dispatch(resetEditedQuestion())
              dispatch(changeMenubarTab('EveryoneQuestions'))
              navigate('/')
            }
          },
        }
    }
    return
  })
  return { loginMutation, registerMutation, logoutMutation }
}
