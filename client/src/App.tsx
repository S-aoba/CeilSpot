import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { CsrfToken } from './types/types'
import { QuestionDetail } from './pages/QDetail'
import { QuestionList } from './pages/QList'
import { QuestionAsk } from './pages/QAsk'
import { selectCsrfState } from './slices/appSlice'
import { Dashboard } from './pages/Dashboard'
import { DashboardQuestion } from './pages/DQuestion'
import { DashboardAnswer } from './pages/DAnswer'
import { DashboardProfile } from './pages/DProfile'
import { Root } from './pages/Root'

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <QuestionList />,
      },
      {
        path: '/:username/question/:questionId',
        element: <QuestionDetail />,
      },
      {
        path: '/question/ask',
        element: <QuestionAsk />,
      },
      {
        element: <Dashboard />,
        children: [
          {
            path: '/dashboard/question',
            element: <DashboardQuestion />,
          },
          {
            path: '/dashboard/answer',
            element: <DashboardAnswer />,
          },
          {
            path: '/dashboard/profile',
            element: <DashboardProfile />,
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
