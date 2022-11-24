import defaultUserIcon from '../../../assets/defaultUserIcon.png'
import { UserName } from './UserName'
import { SelfIntroduction } from './SelfIntroduction'
import { Twitter } from './Twitter'
import { GitHub } from './GitHub'
import { useProcessUserInfo } from '../../../Functional/hooks/useProcessUserInfo'
import { useOutletContext } from 'react-router-dom'
import { WebSite } from './WebSite'
import { UserInfo } from '../../../types/types'
import { useEffect } from 'react'
import { SetRegisteredUserInfo } from './Function/SetRegisteredUserInfo'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUserInfo } from '../../../slices/appSlice'

export const DashboardProfile = () => {
  const { id, username, self_introduction, twitter, github, website } = useOutletContext<UserInfo>()
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)
  const { processUserInfo } = useProcessUserInfo()

  useEffect(() => {
    SetRegisteredUserInfo(id!, username, self_introduction!, twitter!, github!, website!, dispatch, editedUserInfo)
  }, [self_introduction, twitter, github, website])
  console.log(editedUserInfo)

  return (
    <div className=' mt-5 grid h-fit w-11/12 grid-cols-12  rounded-3xl bg-white py-5'>
      <div className='col-span-4 flex justify-center items-center'>
        <div>
          <img src={defaultUserIcon} alt='userIcon' className=' h-40 w-40 rounded-full' />
        </div>
      </div>
      <div className='col-span-8 grid grid-rows-6'>
        <div className=' row-span-5'>
          <form onSubmit={processUserInfo}>
            <div className=' col-span-9 flex flex-col gap-3 pr-5'>
              <SelfIntroduction self_introduction={self_introduction!} />
              <div className=' flex w-full flex-wrap gap-5'>
                <div className=' flex w-full justify-between gap-4'>
                  <Twitter twitterURL={twitter!} />
                  <GitHub githubURL={github!} />
                </div>
                <WebSite websiteURL={website!} />
              </div>
              <div className=' flex justify-end'>
                <button className=' btn-info btn text-white hover:opacity-75'>更新する</button>
              </div>
            </div>
          </form>
        </div>
        <div className=' row-span-1 flex w-full justify-center pt-3'>
          <UserName username={username} />
        </div>
      </div>
      {/* <div className=' grid grid-cols-12 bg-red-50'>
        <div'>
          <img src={defaultUserIcon} alt='userIcon' className=' h-40 w-40 rounded-full' />
        </div>
        <form onSubmit={processUserInfo} className='col-span-9'>
          <div className=' col-span-9 ml-10 flex flex-col justify-center gap-8 pr-5 pl-10'>
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
      </div>
      <div className=' flex justify-center'>
        <UserName username={username} />
      </div>
      */}
    </div>
  )
}
