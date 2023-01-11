import {
  MyPageAnswerPage,
  MyPageProfilePage,
  MyPageQuestionPage,
  QuestionAskPage,
  QuestionDetailPage,
  QuestionListPage,
  RootPage,
} from './pages'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const routerConfig = createBrowserRouter([
  {
    element: <RootPage />,
    children: [
      {
        path: '/',
        element: <QuestionListPage />,
      },
      {
        path: '/:username/question/:questionId',
        element: <QuestionDetailPage />,
      },
      {
        path: '/question/ask',
        element: <QuestionAskPage />,
      },

      {
        path: '/myPage/question',
        element: <MyPageQuestionPage />,
      },
      {
        path: '/myPage/answer',
        element: <MyPageAnswerPage />,
      },
      {
        path: '/myPage/profile',
        element: <MyPageProfilePage />,
      },
    ],
  },
  { path: '*', element: <Navigate to='.' /> },
])
