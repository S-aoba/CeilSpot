import { Outlet } from 'react-router-dom'
import { useQueryUser } from '../../Functional/UseQuery/useQueryUser'
import { useQueryUserInfo } from '../../Functional/UseQuery/useQueryUserInfo'
import { Error } from '../Error/Error'
import { Menu } from './DashboardMenu/Menu'

export const Dashboard = () => {
  const { data: dataUserName, isLoading: isDataUserNameLoading, error: dataUserNameError } = useQueryUser()
  const {
    data: dataUserInfo,
    isLoading: isUserInfoLoading,
    error: dataUserInfoError,
  } = useQueryUserInfo(dataUserName?.username!)

  if (dataUserNameError || dataUserInfoError) return <Error />
  if (isDataUserNameLoading || isUserInfoLoading) return

  return (
    <div className=' flex h-fit min-h-screen flex-col items-center justify-start gap-5 pt-5 lg:container lg:mx-auto'>
      <Menu username={dataUserName?.username!} />
      <Outlet
        context={{
          id: dataUserInfo?.id,
          username: dataUserName?.username,
          self_introduction: dataUserInfo?.self_introduction,
          twitter: dataUserInfo?.twitter,
          github: dataUserInfo?.github,
          website: dataUserInfo?.website,
        }}
      />
    </div>
  )
}
