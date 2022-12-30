import { useQuery } from 'react-query'
import axios from 'axios'
import { UserIdAndUsernameType } from '../../../types/types'
import { useNavigate } from 'react-router-dom'

export const useQueryUserIdAndUsername = () => {
  const navigate = useNavigate()
  const fetchCurrentUserIdAndUsername = async () => {
    const { data } = await axios.get<UserIdAndUsernameType>(`${import.meta.env.VITE_API_URL}/user`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<UserIdAndUsernameType, Error>({
    queryKey: ['user'],
    queryFn: fetchCurrentUserIdAndUsername,
    staleTime: Infinity,
    onError: () => navigate('/'),
  })
}
