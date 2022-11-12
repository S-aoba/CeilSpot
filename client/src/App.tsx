import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
