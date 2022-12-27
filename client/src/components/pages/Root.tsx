import { Outlet } from 'react-router-dom'
import { Error } from '../shared/elements/Error/Error'
import { Header } from '../Header/Header'
import { Loading } from '../shared/elements/Loading/Loading'
import { useQueryAuth } from '../query/useQueryAuth'
import { Footer } from '../Footer/Footer'
import { GlobalMenu } from '../GlobalMenu/GlobalMenu'

export const Root = () => {
  const { data: isAuth, isLoading, error } = useQueryAuth()

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <div className=' h-fit min-h-fit bg-slate-100 pt-14'>
      <Header isAuth={isAuth!} />
      {isAuth && <GlobalMenu />}
      <Outlet context={isAuth!} />
      <Footer />
    </div>
  )
}
