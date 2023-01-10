import {
  MyPage,
  MyPageAnswer,
  MyPageProfile,
  MyPageQuestion,
  QuestionAsk,
  QuestionDetail,
  QuestionList,
  Root,
} from './pages'
import { createBrowserRouter, Navigate } from 'react-router-dom'

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
