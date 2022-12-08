import { Outlet, useLocation } from 'react-router-dom'
import { useQueryUserInfo } from '../functional/UseQuery/useQueryUserInfo'
import { Error } from '../components/shared/elements/Error/Error'
import { Loading } from '../components/shared/elements/Loading/Loading'
import { DashboardBase } from '../components/shared/layout/DashboardBase'

export const MyPage = () => {
  const location = useLocation()
  const userId = location.state
  const { data: dataUserInfo, isLoading: isUserInfoLoading, error: dataUserInfoError } = useQueryUserInfo(userId)
  if (dataUserInfoError || userId === null) return <Error />
  if (isUserInfoLoading) return <Loading />

  return (
    <>
      {dataUserInfo && (
        <DashboardBase userId={userId}>
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
