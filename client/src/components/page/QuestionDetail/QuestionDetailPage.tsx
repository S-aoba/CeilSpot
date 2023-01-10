import { Suspense } from 'react'
import { Loading } from '../../shared/elements/Loading/Loading'
import { QuestionDetail } from './QuestionDetail'

export const QuestionDetailPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <QuestionDetail />
    </Suspense>
  )
}
