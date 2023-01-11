import { Suspense } from 'react'
import { Loading } from '../../shared/elements/Loading/Loading'
import { MyPageQuestion } from './MyPageQuestion'

export const MyPageQuestionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MyPageQuestion />
    </Suspense>
  )
}
