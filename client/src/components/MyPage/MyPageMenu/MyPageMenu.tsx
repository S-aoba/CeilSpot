import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { changeMenubarTab, selectMenubarTab } from '../../../store/slices/menuBarSlice'
import { UserIdAndUsernameType } from '../../../types'
import {
  MyPageMenuLinkTab as ProfileTab,
  MyPageMenuLinkTab as AnswerTab,
  MyPageMenuLinkTab as QuestionTab,
} from './MyPageMenuLinkTab'
import { MyPageMenuTabStyle } from './MyPageMenuTabStyle'

type Props = {
  userIdAndUsername: UserIdAndUsernameType
}

export const MyPageMenu: React.FC<Props> = ({ userIdAndUsername }) => {
  const { questionsStyle, answerStyle, profileStyle } = MyPageMenuTabStyle()
  const dispatch = useAppDispatch()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  return (
    <div className=' flex w-full justify-center border-b bg-white py-4'>
      <nav className=' container mx-auto pl-5'>
        <ul className=' flex list-none gap-x-5 font-mono text-sm font-semibold tracking-wide text-stone-500'>
          <li>
            <QuestionTab
              userIdAndUsername={userIdAndUsername}
              path={`/myPage/question`}
              className={questionsStyle}
              tabWord='自分の質問'
              onClick={() => dispatch(changeMenubarTab({ ...currentMenuBarTabType, myPageMenu: 'myQuestion' }))}
            />
          </li>
          <li>
            <AnswerTab
              userIdAndUsername={userIdAndUsername}
              path={`/myPage/answer`}
              className={answerStyle}
              tabWord='自分の回答'
              onClick={() => dispatch(changeMenubarTab({ ...currentMenuBarTabType, myPageMenu: 'myAnswer' }))}
            />
          </li>
          <li>
            <ProfileTab
              userIdAndUsername={userIdAndUsername}
              path={`/myPage/profile`}
              className={profileStyle}
              tabWord='プロフィール'
              onClick={() => dispatch(changeMenubarTab({ ...currentMenuBarTabType, myPageMenu: 'myProfile' }))}
            />
          </li>
        </ul>
      </nav>
    </div>
  )
}
