import defaultUserIcon from '../../../assets/defaultUserIcon.png'
import { UserName } from './UserName'
import { SelfIntroduction } from './SelfIntroduction'
import { Twitter } from './Twitter'
import { GitHub } from './GitHub'
import { WebSite } from './WebSite'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUserInfo } from '../../../slices/appSlice'
import { useLocation } from 'react-router-dom'
import { UserInfo } from '../../shared/types/types'
import { useEffect } from 'react'
import { SetRegisteredUserInfo } from './Function/SetRegisteredUserInfo'
import { useProcessUserInfo } from '../../shared/hooks/useProcessUserInfo'

export const DashboardProfile = () => {
  const location = useLocation()
  const { username, self_introduction, twitter, github, website } = location.state as UserInfo
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)
  const { processUserInfo } = useProcessUserInfo()

  useEffect(() => {
    SetRegisteredUserInfo(username, self_introduction!, twitter!, github!, website!, dispatch, editedUserInfo)
  }, [])

  return (
    <form
      onSubmit={processUserInfo}
      className=' mt-5 grid h-fit max-h-fit w-11/12 grid-cols-12 rounded-3xl bg-white py-5'>
      <div className=' col-span-3 flex items-center justify-center'>
        <img src={defaultUserIcon} alt='userIcon' className=' h-40 w-40 rounded-full' />
      </div>
      <div className=' col-span-9 ml-10 flex flex-col justify-center gap-8 pr-5 pl-10'>
        <UserName username={username} />
        <SelfIntroduction self_introduction={self_introduction!} />
        <div className=' flex w-full flex-wrap gap-5'>
          <div className=' flex w-full justify-between gap-4'>
            <Twitter twitterURL={twitter!} />
            <GitHub githubURL={github!} />
          </div>
          <WebSite websiteURL={website!} />
        </div>
        <div>
          <button className=' btn-info btn text-white'>更新する</button>
        </div>
      </div>
    </form>
  )
}
