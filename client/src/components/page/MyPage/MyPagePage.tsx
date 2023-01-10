import { Suspense } from 'react'
import { Loading } from '../../shared/elements/Loading/Loading'
import { MyPage } from './MyPage'

export const MyPagePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MyPage />
    </Suspense>
  )
}
