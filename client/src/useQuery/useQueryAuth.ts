import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const useQueryAuth = () => {
  const navigate = useNavigate()
  const fetchIsAuthenticated = async () => {
    const { data } = await axios.get<boolean>(`${import.meta.env.VITE_API_URL}/auth`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<boolean, Error>({
    queryKey: ['auth'],
    queryFn: fetchIsAuthenticated,
    staleTime: Infinity,
    onError: () => navigate('/'),
  })
}
