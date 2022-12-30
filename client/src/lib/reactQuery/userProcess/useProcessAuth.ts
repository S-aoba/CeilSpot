import { FormEvent, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useToastify } from '../../toastify/useToastify'
import { useMutateAuth } from '../useMutate/useMutateAuth'

export const useProcessAuth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [selfIntroduction, setSelfIntroduction] = useState('')
  const [twitter, setTwitter] = useState('')
  const [github, setGithub] = useState('')
  const [website, setWebsite] = useState('')
  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toastInfo } = useToastify()

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
          self_introduction: selfIntroduction,
          twitter: twitter,
          github: github,
          website: website,
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
          setSelfIntroduction('')
          setTwitter('')
          setGithub('')
          setWebsite('')
        })
    }
  }
  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.invalidateQueries(['auth'])
    queryClient.removeQueries('user')
    queryClient.removeQueries('questions')
    queryClient.removeQueries('singleQuestion')
    queryClient.removeQueries('answers')
    queryClient.removeQueries('singleAnswer')
    queryClient.removeQueries('userInfo')
    queryClient.removeQueries('auth')
    navigate('/')
    toastInfo('ログアウトしました。')
  }
  return {
    userName,
    setUserName,
    email,
    setEmail,
    pw,
    setPw,
    selfIntroduction,
    setSelfIntroduction,
    twitter,
    setTwitter,
    github,
    setGithub,
    website,
    setWebsite,
    isLogin,
    setIsLogin,
    processAuth,
    loginMutation,
    registerMutation,
    logout,
  }
}
