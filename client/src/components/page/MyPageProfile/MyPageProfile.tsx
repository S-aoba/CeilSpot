import defaultUserIcon from '../../../assets/defaultUserIcon.png'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useProcessUserInfo } from '../../../lib/reactQuery/userProcess/useProcessUserInfo'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { selectMenubarTab, changeMenubarTab } from '../../../store/slices/menuBarSlice'
import { selectUserInfo } from '../../../store/slices/userInfoSlice'
import { SetRegisteredUserInfo } from '../../MyPage/MyPageProfile/Function/SetRegisteredUserInfo'
import { GitHub } from '../../MyPage/MyPageProfile/GitHub'
import { SelfIntroduction } from '../../MyPage/MyPageProfile/SelfIntroduction'
import { Twitter } from '../../MyPage/MyPageProfile/Twitter'
import { UserName } from '../../MyPage/MyPageProfile/UserName'
import { WebSite } from '../../MyPage/MyPageProfile/WebSite'
import { Button } from '../../ui/Button'
import { useQueryUserInfo } from '../../../lib/reactQuery/useQuery/useQueryUserInfo'
import { MyPageBase } from '../../shared/layout/MyPageBase'

export const MyPageProfile = () => {
  const location = useLocation()
  const userIdAndUsername = location.state
  const { data: dataUserInfo } = useQueryUserInfo(userIdAndUsername.userId)

  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)
  const { processUserInfo } = useProcessUserInfo()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  useEffect(() => {
    SetRegisteredUserInfo(
      dataUserInfo?.id!,
      dataUserInfo?.username!,
      dataUserInfo?.self_introduction!,
      dataUserInfo?.twitter!,
      dataUserInfo?.github!,
      dataUserInfo?.website!,
      dispatch,
      editedUserInfo
    )
  }, [dataUserInfo?.self_introduction, dataUserInfo?.twitter, dataUserInfo?.github, dataUserInfo?.website])

  useEffect(() => {
    // 画面更新したい際にナビゲーションタブが初期化されるので、dispatchで上書きする
    dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'myPage', myPageMenu: 'myProfile' }))
  }, [])

  return (
    <MyPageBase userIdAndUsername={userIdAndUsername}>
      <div className=' flex w-full flex-col items-center justify-center py-3 lg:flex-row lg:items-stretch'>
        <div className=' flex w-8/12 items-center justify-center gap-5 rounded-t-lg bg-gray-700 py-5 px-4 lg:w-fit lg:rounded-l-lg lg:rounded-tr-none lg:px-10'>
          <img src={defaultUserIcon} alt='userIcon' className=' h-20 w-20 rounded-full' />
        </div>
        <div className=' w-8/12 rounded-b-lg bg-white py-10 px-10 shadow-lg lg:w-9/12 lg:rounded-r-lg lg:rounded-bl-none'>
          <form onSubmit={processUserInfo}>
            <SelfIntroduction self_introduction={dataUserInfo?.self_introduction!} />
            <div className=' mb-5 grid grid-cols-1 gap-y-5 lg:mb-0 lg:grid-cols-2 lg:gap-x-5'>
              <Twitter twitterURL={dataUserInfo?.twitter!} />
              <GitHub githubURL={dataUserInfo?.github!} />
            </div>
            <WebSite websiteURL={dataUserInfo?.website!} />
            <div className=' flex justify-center py-2'>
              <Button type='submit' label='更新する' />
            </div>
          </form>
          <hr className=' my-4' />
          <UserName userId={dataUserInfo?.id!} username={dataUserInfo?.username!} />
        </div>
      </div>
    </MyPageBase>
  )
}
