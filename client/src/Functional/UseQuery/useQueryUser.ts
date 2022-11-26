import { useQuery } from 'react-query'
import axios from 'axios'
import { UserIdType } from '../../types/types'
import { useNavigate } from 'react-router-dom'

export const useQueryUserId = () => {
  const navigate = useNavigate()
  const getCurrentUserId = async () => {
    const { data } = await axios.get<UserIdType>(`${import.meta.env.VITE_API_URL}/user`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<UserIdType, Error>({
    queryKey: ['user'],
    queryFn: getCurrentUserId,
    staleTime: Infinity,
    onError: () => navigate('/'),
  })
}
