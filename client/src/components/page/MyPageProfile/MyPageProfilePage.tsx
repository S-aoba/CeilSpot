import { Suspense } from 'react'
import { Loading } from '../../shared/elements/Loading/Loading'
import { MyPageProfile } from './MyPageProfile'

export const MyPageProfilePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MyPageProfile />
    </Suspense>
  )
}
