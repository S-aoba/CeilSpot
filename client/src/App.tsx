import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { CsrfToken } from './components/shared/types/types'
import { QuestionDetail } from './components/Users/QuestionDetail'
import { QuestionItem } from './components/Users/QuestionItem'
import { Question } from './pages/Question'
import { selectCsrfState } from './slices/appSlice'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Question />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: '/',
        element: <QuestionItem />,
      },
    ],
  },
  {
    path: '/question/:username/:question_id',
    element: <Question />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: '/question/:username/:question_id',
        element: <QuestionDetail />,
      },
    ],
  },
])

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
