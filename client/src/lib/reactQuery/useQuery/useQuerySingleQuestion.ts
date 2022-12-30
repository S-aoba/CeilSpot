import { useQuery } from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { QuestionType } from '../../../types/types'
import { toggleCsrfState } from '../../../slices/csrfSlice'
import { resetEditedQuestion } from '../../../slices/questionSlice'

export const useQuerySingleQuestion = (id: string) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const getSingleQuestion = async (id: string) => {
    const { data } = await axios.get<QuestionType>(`${import.meta.env.VITE_API_URL}/question/${id}`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<QuestionType, Error>({
    queryKey: ['singleQuestion', id],
    queryFn: () => getSingleQuestion(id),
    enabled: !!id,
    staleTime: Infinity,
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
  })
}
