import { Outlet, useLocation } from 'react-router-dom'
import { Title } from '../shared/elements/Title'
import { Menu } from './DashboardMenu/Menu'

export const Dashboard = () => {
  const location = useLocation()
  const username = location.state as string

  return (
    <div
      id='dashboard'
      className=' flex h-fit min-h-screen flex-col items-center justify-start gap-5 pt-5 lg:container lg:mx-auto'>
      <Title className=' w-11/12 py-3 text-3xl font-bold xl:w-10/12'>Dashboard</Title>
      <Menu username={username} />
      <Outlet />
    </div>
  )
}
