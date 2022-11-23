import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { toggleCsrfState } from '../../slices/appSlice'
import { UserInfo } from '../../types/types'

export const useQueryUserInfo = (username: string) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
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
    onError: (err: any) => {
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
