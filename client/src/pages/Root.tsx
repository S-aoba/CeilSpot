import { Outlet } from 'react-router-dom'
import { Error } from '../components/Error/Error'
import { Header } from '../components/Header/Header'
import { Loading } from '../components/Loading/Loading'
import { useQueryAuth } from '../functional/UseQuery/useQueryAuth'

export const Root = () => {
  const { data: isAuth, isLoading, error } = useQueryAuth()

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <div className=' min-h-screen bg-slate-200'>
      <Header isAuth={isAuth!} />
      <Outlet context={isAuth!} />
    </div>
  )
}
