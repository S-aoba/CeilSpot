import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { HeaderLeft } from './components/Header/HeaderLeft/HeaderLeft'
import { QuestionDetail } from './components/Users/QuestionDetail'
import { Question } from './pages/Question'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Question />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: '/questions/:questionId',
        element: <QuestionDetail />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
