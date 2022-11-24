import { useQuery } from 'react-query'
import axios from 'axios'
import { UsernameType } from '../../types/types'
import { useNavigate } from 'react-router-dom'

export const useQueryUser = () => {
  const navigate = useNavigate()
  const getCurrentUser = async () => {
    const { data } = await axios.get<UsernameType>(`${import.meta.env.VITE_API_URL}/user`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<UsernameType, Error>({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 0,
    onError: () => navigate('/'),
  })
}
