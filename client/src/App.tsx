import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { CsrfToken } from './types/types'
import { QuestionDetail } from './components/pages/QDetail'
import { QuestionList } from './components/pages/QList'
import { QuestionAsk } from './components/pages/QAsk'
import { MyPage } from './components/pages/MyPage'
import { MyPageQuestion } from './components/pages/MyPageQuestion'
import { MyPageAnswer } from './components/pages/MyPageAnswer'
import { MyPageProfile } from './components/pages/MyPageProfile'
import { Root } from './components/pages/Root'
import { selectCsrfState } from './slices/csrfSlice'

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
        element: <MyPage />,
        children: [
          {
            path: '/myPage/question',
            element: <MyPageQuestion />,
          },
          {
            path: '/myPage/answer',
            element: <MyPageAnswer />,
          },
          {
            path: '/myPage/profile',
            element: <MyPageProfile />,
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
