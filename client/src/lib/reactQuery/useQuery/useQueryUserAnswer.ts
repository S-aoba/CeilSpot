import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/app/hooks'
import { toggleCsrfState } from '../../../store/slices/csrfSlice'
import { AnswerType } from '../../../types'

export const useQueryUserAnswer = (username: string) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const getUserQuestions = async (username: string) => {
    const { data } = await axios.get<AnswerType[]>(`${import.meta.env.VITE_API_URL}/${username}/answer`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<AnswerType[], Error>({
    queryKey: ['userAnswers', username],
    queryFn: () => getUserQuestions(username),
    enabled: !!username,
    staleTime: Infinity,
    onError: (err: any) => {
      if (
        err.response.data.detail === 'The JWT has expired' ||
        err.response.data.detail === 'The CSRF token has expired.'
      ) {
        dispatch(toggleCsrfState())
        navigate('/')
      }
    },
  })
}
