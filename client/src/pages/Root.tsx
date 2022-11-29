import { Outlet } from 'react-router-dom'
import { Error } from '../components/shared/elements/Error/Error'
import { Header } from '../components/Header/Header'
import { Loading } from '../components/shared/elements/Loading/Loading'
import { useQueryAuth } from '../functional/UseQuery/useQueryAuth'

export const Root = () => {
  const { data: isAuth, isLoading, error } = useQueryAuth()

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <div className=' h-fit min-h-screen bg-slate-50 pt-20'>
      <Header isAuth={isAuth!} />
      <Outlet context={isAuth!} />
    </div>
  )
}
