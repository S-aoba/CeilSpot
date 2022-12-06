import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { toggleCsrfState } from '../../slices/csrfSlice'
import { QuestionType } from '../../types/types'

export const useQueryUserQuestion = (username: string) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const getUserQuestions = async (username: string) => {
    const { data } = await axios.get<QuestionType[]>(`${import.meta.env.VITE_API_URL}/${username}/question`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<QuestionType[], Error>({
    queryKey: ['userQuestions', username],
    queryFn: () => getUserQuestions(username),
    enabled: !!username,
    staleTime: Infinity,
    onError: (err: any) => {
      // alert(`${err.response.data.detail as string}\n${err.message as string}`)
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
