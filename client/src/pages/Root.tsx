import { Outlet } from 'react-router-dom'
import { Error } from '../components/Error/Error'
import { Header } from '../components/Header/Header'
import { Loading } from '../components/Loading/Loading'
import { useQueryUserIdAndUsername } from '../functional/UseQuery/useQueryUserIdAndUsername'

export const Root = () => {
  const { data, isLoading, error } = useQueryUserIdAndUsername()

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <div className=' min-h-screen bg-slate-200'>
      <Header />
      <Outlet context={data} />
    </div>
  )
}
