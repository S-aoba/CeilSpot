import { Outlet } from 'react-router-dom'
import { useQueryAuth } from '../../../lib/reactQuery/useQuery/useQueryAuth'
import { Footer } from '../../Footer/Footer'
import { GlobalMenu } from '../../GlobalMenu/GlobalMenu'
import { Header } from '../../Header/Header'
import { Error } from '../../shared/elements/Error/Error'
import { Loading } from '../../shared/elements/Loading/Loading'

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
