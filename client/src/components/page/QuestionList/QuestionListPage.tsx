import { Suspense } from 'react'
import { Loading } from '../../shared/elements/Loading/Loading'
import { QuestionList } from './QuestionList'

export const QuestionListPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <QuestionList />
    </Suspense>
  )
}
