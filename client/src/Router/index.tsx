import { createBrowserRouter } from 'react-router-dom'
import { MyPage } from '../components/pages/MyPage'
import { MyPageAnswer } from '../components/pages/MyPageAnswer'
import { MyPageProfile } from '../components/pages/MyPageProfile'
import { MyPageQuestion } from '../components/pages/MyPageQuestion'
import { QuestionAsk } from '../components/pages/QAsk'
import { QuestionDetail } from '../components/pages/QDetail'
import { QuestionList } from '../components/pages/QList'
import { Root } from '../components/pages/Root'

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
    ],
  },
])
