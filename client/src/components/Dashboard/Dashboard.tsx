import { Outlet, useLocation } from 'react-router-dom'
import { useQueryUserInfo } from '../../functional/UseQuery/useQueryUserInfo'
import { Error } from '../Error/Error'
import { Loading } from '../Loading/Loading'
import { DashboardBase } from '../shared/layout/DashboardBase'
import { RootBase } from '../shared/layout/RootBase'
import { Menu } from './DashboardMenu/Menu'

export const Dashboard = () => {
  const location = useLocation()
  const userId = location.state
  const { data: dataUserInfo, isLoading: isUserInfoLoading, error: dataUserInfoError } = useQueryUserInfo(userId)

  if (dataUserInfoError) return <Error />
  if (isUserInfoLoading) return <Loading />

  return (
    <>
      {dataUserInfo && (
        <DashboardBase>
          <Menu userId={dataUserInfo.id!} />
          <Outlet
            context={{
              userID: userId,
              id: dataUserInfo.id,
              username: dataUserInfo.username,
              self_introduction: dataUserInfo.self_introduction,
              twitter: dataUserInfo.twitter,
              github: dataUserInfo.github,
              website: dataUserInfo.website,
            }}
          />
        </DashboardBase>
      )}
    </>
  )
}
