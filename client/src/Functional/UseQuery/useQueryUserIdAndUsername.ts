import { useQuery } from 'react-query'
import axios from 'axios'
import { UserIdType } from '../../types/types'
import { useNavigate } from 'react-router-dom'

export const useQueryUserIdAndUsername = () => {
  const navigate = useNavigate()
  const fetchCurrentUserIdAndUsername = async () => {
    const { data } = await axios.get<UserIdType>(`${import.meta.env.VITE_API_URL}/user`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<UserIdType, Error>({
    queryKey: ['user'],
    queryFn: fetchCurrentUserIdAndUsername,
    staleTime: Infinity,
    onError: () => navigate('/'),
  })
}
