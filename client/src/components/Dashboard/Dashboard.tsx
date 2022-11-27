import { Outlet } from 'react-router-dom'
import { useQueryUserIdAndUsername } from '../../functional/UseQuery/useQueryUserIdAndUsername'
import { useQueryUserInfo } from '../../functional/UseQuery/useQueryUserInfo'
import { Error } from '../Error/Error'
import { Loading } from '../Loading/Loading'
import { Menu } from './DashboardMenu/Menu'

export const Dashboard = () => {
  const { data: dataUserId, isLoading: isDataUserNameLoading, error: dataUserNameError } = useQueryUserIdAndUsername()
  const {
    data: dataUserInfo,
    isLoading: isUserInfoLoading,
    error: dataUserInfoError,
  } = useQueryUserInfo(dataUserId?.userId!)
  if (isDataUserNameLoading || isUserInfoLoading) return <Loading />
  if (dataUserNameError || dataUserInfoError) return <Error />
  console.log(dataUserInfo)

  return (
    <div className=' flex h-fit min-h-screen flex-col items-center justify-start gap-5 pt-5 lg:container lg:mx-auto'>
      {dataUserInfo && dataUserId && (
        <>
          <Menu username={dataUserInfo.username} />
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
        </>
      )}
    </div>
  )
}
