import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { UserInfo } from '../../types/types'

export const useQueryUserInfo = (username: string) => {
  const navigate = useNavigate()
  const getCurrentUserInfo = async (username: string) => {
    const { data } = await axios.get<UserInfo>(`${import.meta.env.VITE_API_URL}/user/${username}`, {
      withCredentials: true,
    })
    return data
  }
  return useQuery<UserInfo, Error>({
    queryKey: ['userInfo', username],
    queryFn: () => getCurrentUserInfo(username),
    enabled: !!username,
    staleTime: Infinity,
    onError: () => navigate('/'),
  })
}
