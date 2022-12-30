import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Root } from '../components/pages/Root'
import { QuestionList } from '../components/pages/QList'
import { QuestionDetail } from '../components/pages/QDetail'
import { QuestionAsk } from '../components/pages/QAsk'
import { MyPage } from '../components/pages/MyPage'
import { MyPageQuestion } from '../components/pages/MyPageQuestion'
import { MyPageAnswer } from '../components/pages/MyPageAnswer'
import { MyPageProfile } from '../components/pages/MyPageProfile'

export const router = createBrowserRouter([
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
