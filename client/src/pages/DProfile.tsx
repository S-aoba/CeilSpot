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
    <div className=' flex w-full justify-center py-3'>
      <div className=' flex items-center justify-center gap-5 rounded-l-lg bg-gray-700 py-5 px-10'>
        <img src={defaultUserIcon} alt='userIcon' className=' h-20 w-20 rounded-full' />
      </div>
      <div className=' w-9/12 rounded-r-lg bg-white py-10 px-10 shadow-lg'>
        <form onSubmit={processUserInfo}>
          <SelfIntroduction self_introduction={self_introduction!} />
          <div className=' flex justify-between py-2'>
            <Twitter twitterURL={twitter!} />
            <GitHub githubURL={github!} />
          </div>
          <WebSite websiteURL={website!} />
          <div className=' flex justify-center py-2'>
            <button className=' btn-info btn text-white hover:opacity-75'>更新する</button>
          </div>
        </form>
        <hr className=' my-4' />
        <UserName userId={id!} username={username} />
      </div>
    </div>
  )
}
