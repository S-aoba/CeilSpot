import { Outlet, useLocation } from 'react-router-dom'
import { useQueryUserInfo } from '../../Functional/UseQuery/useQueryUserInfo'
import { Error } from '../Error/Error'
import { Loading } from '../Loading/Loading'
import { Menu } from './DashboardMenu/Menu'

export const Dashboard = () => {
  const location = useLocation()
  const username = location.state as string
  const { data: dataUserInfo, isLoading: isUserInfoLoading, error } = useQueryUserInfo(username)

  if (error) return <Error />
  if (isUserInfoLoading) return <Loading />
  return (
    <div
      id='dashboard'
      className=' flex h-fit min-h-screen flex-col items-center justify-start gap-5 pt-5 lg:container lg:mx-auto'>
      <Menu username={username} />
      <Outlet
        context={{
          username,
          self_introduction: dataUserInfo?.self_introduction,
          twitter: dataUserInfo?.twitter,
          github: dataUserInfo?.github,
          website: dataUserInfo?.website,
        }}
      />
    </div>
  )
}
