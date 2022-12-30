import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { CsrfToken } from './types/types'
import { selectCsrfState } from './slices/csrfSlice'
import { router } from './router'

const App = () => {
  const csrf = useAppSelector(selectCsrfState)
  useEffect(() => {
    const getCsrfToken = async (): Promise<void> => {
      const res: AxiosResponse<CsrfToken> = await axios.get<CsrfToken>(`${import.meta.env.VITE_API_URL}/csrftoken`)
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
    }
    getCsrfToken().catch((error) => {
      console.log(error)
    })
  }, [csrf])
  return <RouterProvider router={router} />
}

export default App
