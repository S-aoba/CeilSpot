import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { toggleCsrfState, resetEditedAnswer } from '../../slices/appSlice'
import { AnswerType } from '../../types/types'

export const useQuerySingleAnswer = (answer_id: string) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const fetchAnswerData = async (answer_id: string) => {
    const { data } = await axios.get<AnswerType>(`${import.meta.env.VITE_API_URL}/answer/${answer_id}`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<AnswerType, Error>({
    queryKey: ['singleAnswer', answer_id],
    queryFn: () => fetchAnswerData(answer_id),
    enabled: !!answer_id,
    cacheTime: 10,
    // staleTime: Infinity,
    onError: (err: any) => {
      alert(`${err.response.data.detail}\n${err.message}`)
      if (
        err.response.data.detail === 'The JWT has expired' ||
        err.response.data.detail === 'The CSRF token has expired.'
      ) {
        dispatch(toggleCsrfState())
        dispatch(resetEditedAnswer())
        navigate('/')
      }
    },
  })
}
