import defaultUserIcon from '../../../assets/defaultUserIcon.png'
import { UserName } from './UserName'
import { SelfIntroduction } from './SelfIntroduction'
import { Twitter } from './Twitter'
import { GitHub } from './GitHub'
import { useProcessUserInfo } from '../../../Functional/hooks/useProcessUserInfo'
import { useOutletContext } from 'react-router-dom'
import { WebSite } from './WebSite'
import { useQueryUserInfo } from '../../../Functional/UseQuery/useQueryUserInfo'
import { Loading } from '../../Loading/Loading'
import { Error } from '../../Error/Error'

export const DashboardProfile = () => {
  const username = useOutletContext<string>()
  const { data: dataUserInfo, isLoading: isUserInfoLoading, error } = useQueryUserInfo(username)
  const { processUserInfo } = useProcessUserInfo()
  if (error) return <Error />
  if (isUserInfoLoading) return <Loading />

  return (
    <form
      onSubmit={processUserInfo}
      className=' mt-5 grid h-fit max-h-fit w-11/12 grid-cols-12 rounded-3xl bg-white py-5'>
      <div className=' col-span-3 flex items-center justify-center'>
        <img src={defaultUserIcon} alt='userIcon' className=' h-40 w-40 rounded-full' />
      </div>
      <div className=' col-span-9 ml-10 flex flex-col justify-center gap-8 pr-5 pl-10'>
        <UserName username={username} />
        {dataUserInfo && (
          <>
            <SelfIntroduction self_introduction={dataUserInfo.self_introduction!} />
            <div className=' flex w-full flex-wrap gap-5'>
              <div className=' flex w-full justify-between gap-4'>
                <Twitter twitterURL={dataUserInfo.twitter!} />
                <GitHub githubURL={dataUserInfo.github!} />
              </div>
              <WebSite websiteURL={dataUserInfo.website!} />
            </div>
          </>
        )}
        <div>
          <button className=' btn-info btn text-white'>更新する</button>
        </div>
      </div>
    </form>
  )
}
