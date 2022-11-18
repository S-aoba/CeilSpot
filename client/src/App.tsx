import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { CsrfToken } from './components/shared/types/types'
import { QuestionDetail } from './components/Users/QuestionDetail/QuestionDetail'
import { QuestionItem } from './components/Users/QuestionItem/QuestionItem'
import { QuestionAsk } from './components/Users/QuestionAsk/QuestionAsk'
import { Question } from './pages/Question'
import { selectCsrfState } from './slices/appSlice'
import { Dashboard } from './components/Dashboard/Dashboard'
import { DashboardQuestion } from './components/Dashboard/DashboardQuestion/DashboardQuestion'

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
      {
        path: '/question/:username/:question_id',
        element: <QuestionDetail />,
      },
      {
        path: '/question/ask',
        element: <QuestionAsk />,
      },
      {
        path: '/dashboard/:username/question',
        element: <Dashboard />,
        children: [
          {
            path: '/dashboard/:username/question',
            element: <DashboardQuestion />,
          },
        ],
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
