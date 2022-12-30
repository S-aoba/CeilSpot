import axios from 'axios'
import { useQuery } from 'react-query'
import { QuestionType } from '../../../types/types'

export const useQueryQuestions = () => {
  const getQuestions = async () => {
    const { data } = await axios.get<QuestionType[]>(`${import.meta.env.VITE_API_URL}/question`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<QuestionType[], Error>({
    queryKey: ['questions'],
    queryFn: getQuestions,
    staleTime: Infinity,
  })
}
