import { Suspense } from 'react'
import { Loading } from '../../shared/elements/Loading/Loading'
import { QuestionAsk } from './QuestionAsk'

export const QuestionAskPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <QuestionAsk />
    </Suspense>
  )
}
