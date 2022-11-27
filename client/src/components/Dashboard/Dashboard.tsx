import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { useQueryUserInfo } from '../../functional/UseQuery/useQueryUserInfo'
import { Error } from '../Error/Error'
import { Loading } from '../Loading/Loading'
import { Menu } from './DashboardMenu/Menu'

export const Dashboard = () => {
  // const userIDAndUsername = useOutletContext<UserIdAndUsernameType>()
  const location = useLocation()
  const userId = location.state
  const { data: dataUserInfo, isLoading: isUserInfoLoading, error: dataUserInfoError } = useQueryUserInfo(userId)

  if (dataUserInfoError) return <Error />
  if (isUserInfoLoading) return <Loading />

  return (
    <>
      {dataUserInfo && (
        <div className=' flex h-fit min-h-screen flex-col items-center justify-start gap-5 pt-5 lg:container lg:mx-auto'>
          <Menu userId={dataUserInfo.id!} />
          <Outlet
            context={{
              id: dataUserInfo.id,
              username: dataUserInfo.username,
              self_introduction: dataUserInfo.self_introduction,
              twitter: dataUserInfo.twitter,
              github: dataUserInfo.github,
              website: dataUserInfo.website,
            }}
          />
        </div>
      )}
    </>
  )
}
