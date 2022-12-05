import { Outlet } from 'react-router-dom'
import { Error } from '../components/shared/elements/Error/Error'
import { Header } from '../components/Header/Header'
import { Loading } from '../components/shared/elements/Loading/Loading'
import { useQueryAuth } from '../functional/UseQuery/useQueryAuth'
import { Footer } from '../components/Footer/Footer'
import { GlobalMenu } from '../components/GlobalMenu/GlobalMenu'

export const Root = () => {
  const { data: isAuth, isLoading, error } = useQueryAuth()

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <div className=' h-fit min-h-fit bg-slate-100 pt-14'>
      <Header isAuth={isAuth!} />
      <GlobalMenu />
      <Outlet context={isAuth!} />
      <Footer />
    </div>
  )
}
