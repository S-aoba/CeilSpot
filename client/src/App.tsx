import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { CsrfToken } from './types/types'
import { QuestionDetail } from './components/Users/QuestionDetail/QuestionDetail'
import { QuestionItem } from './components/Users/QuestionItem/QuestionItem'
import { QuestionAsk } from './components/Users/QuestionAsk/QuestionAsk'
import { Question } from './pages/Question'
import { selectCsrfState } from './slices/appSlice'
import { Dashboard } from './components/Dashboard/Dashboard'
import { DashboardQuestion } from './components/Dashboard/DashboardQuestion/DashboardQuestion'
import { DashboardAnswer } from './components/Dashboard/DashboardAnswer/DashboardAnswer'
import { DashboardProfile } from './components/Dashboard/DashboardProfile/DashboardProfile'
import { Root } from './pages/Root'
import { AnswerItem } from './components/Users/AnswerItem/AnswerItem'
import { AnswerForm } from './components/Users/AnswerReply/AnswerForm'

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <Question />,
        children: [
          {
            path: '/',
            element: <QuestionItem />,
          },
          {
            path: '/:username/question/:questionId',
            element: <QuestionDetail />,
            children: [
              // {
              //   element: <AnswerItem />,
              // },
              // {
              //   element: <AnswerForm />,
              // },
            ],
          },
        ],
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
