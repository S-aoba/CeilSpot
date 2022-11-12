import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QuestionDetail } from './components/Users/QuestionDetail'
import { QuestionItem } from './components/Users/QuestionItem'
import { Question } from './pages/Question'

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
  return <RouterProvider router={router} />
}

export default App
