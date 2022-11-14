import { FormEvent, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useMutateAuth } from './useMutateAuth'
import { toast } from 'react-toastify'

export const useProcessAuth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const processAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({
        username: userName,
        email: email,
        password: pw,
      })
    } else {
      await registerMutation
        .mutateAsync({
          username: userName,
          email: email,
          password: pw,
        })
        .then(() =>
          loginMutation.mutate({
            username: userName,
            email: email,
            password: pw,
          })
        )
        .catch(() => {
          setUserName('')
          setPw('')
          setEmail('')
        })
    }
  }
  const logout = async () => {
    await logoutMutation.mutateAsync()
    toast.success('ログアウトしました。', {
      autoClose: 2000,
      closeOnClick: true,
    })
    // queryClient.removeQueries('questions')
    queryClient.removeQueries('user')
    queryClient.invalidateQueries(['user'])
    // queryClient.removeQueries('userQuestions')
    // queryClient.removeQueries('singleQuestion')
    // queryClient.removeQueries('singleAnswer')
    navigate('/')
  }
  return {
    userName,
    setUserName,
    email,
    setEmail,
    pw,
    setPw,
    isLogin,
    setIsLogin,
    processAuth,
    loginMutation,
    registerMutation,
    logout,
  }
}
