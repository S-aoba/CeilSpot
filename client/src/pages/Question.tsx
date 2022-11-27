import { Outlet } from 'react-router-dom'
import { Loading } from '../components/Loading/Loading'
import { QuestionItem } from '../components/Users/QuestionItem/QuestionItem'
import { useQueryUserIdAndUsername } from '../functional/UseQuery/useQueryUserIdAndUsername'

export const Question = () => {
  const { data: userIdAndUsername, isLoading, error } = useQueryUserIdAndUsername()

  if (error) return <QuestionItem />
  if (isLoading) return <Loading />

  return <Outlet context={userIdAndUsername} />
}
