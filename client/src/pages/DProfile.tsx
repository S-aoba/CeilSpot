import defaultUserIcon from '../assets/defaultUserIcon.png'
import { UserName } from '../components/Dashboard/DProfile/UserName'
import { SelfIntroduction } from '../components/Dashboard/DProfile/SelfIntroduction'
import { Twitter } from '../components/Dashboard/DProfile/Twitter'
import { GitHub } from '../components/Dashboard/DProfile/GitHub'
import { useOutletContext } from 'react-router-dom'
import { WebSite } from '../components/Dashboard/DProfile/WebSite'
import { UserInfo } from '../types/types'
import { useEffect } from 'react'
import { SetRegisteredUserInfo } from '../components/Dashboard/DProfile/Function/SetRegisteredUserInfo'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useProcessUserInfo } from '../functional/hooks/UserProcess/useProcessUserInfo'
import { changeMenubarTab, selectMenubarTab } from '../slices/menuBarSlice'
import { selectUserInfo } from '../slices/userInfoSlice'

export const DashboardProfile = () => {
  const { id, username, self_introduction, twitter, github, website } = useOutletContext<UserInfo>()
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)
  const { processUserInfo } = useProcessUserInfo()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  useEffect(() => {
    SetRegisteredUserInfo(id!, username, self_introduction!, twitter!, github!, website!, dispatch, editedUserInfo)
  }, [self_introduction, twitter, github, website])

  useEffect(() => {
    // 画面更新したい際にナビゲーションタブが初期化されるので、dispatchで上書きする
    dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'myPage', myPageMenu: 'myProfile' }))
  }, [])

  return (
    <div className=' mt-5 grid h-fit w-11/12 animate-fade-in-fwd grid-cols-12 rounded-3xl bg-white py-10'>
      <div className='col-span-3 flex items-center justify-center'>
        <div>
          <img src={defaultUserIcon} alt='userIcon' className=' h-40 w-40 rounded-full' />
        </div>
      </div>
      <div className='col-span-9 grid grid-rows-6'>
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
          <UserName userId={id!} username={username} />
        </div>
      </div>
    </div>
  )
}
