import { Suspense } from 'react'
import { Loading } from '../../shared/elements/Loading/Loading'
import { MyPageAnswer } from './MyPageAnswer'

export const MyPageAnswerPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MyPageAnswer />
    </Suspense>
  )
}
