import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Root } from './pages/Root'
import { QuestionList } from './pages/QList'
import { QuestionDetail } from './pages/QDetail'
import { QuestionAsk } from './pages/QAsk'
import { MyPage } from './pages/MyPage'
import { MyPageQuestion } from './pages/MyPageQuestion'
import { MyPageAnswer } from './pages/MyPageAnswer'
import { MyPageProfile } from './pages/MyPageProfile'

export const routerConfig = createBrowserRouter([
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
      { path: '*', element: <Navigate to='.' /> },
    ],
  },
])
