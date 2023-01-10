import { Suspense } from 'react'
import { Loading } from '../../shared/elements/Loading/Loading'
import { Root } from './Root'

export const RootPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Root />
    </Suspense>
  )
}
