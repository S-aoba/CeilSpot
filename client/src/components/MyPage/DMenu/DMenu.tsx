import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { changeMenubarTab, selectMenubarTab } from '../../../slices/menuBarSlice'
import { MenuLinkTab as ProfileTab, MenuLinkTab as AnswerTab, MenuLinkTab as QuestionTab } from './DMenuLinkTab'
import { MenuTabStyle } from './DMenuTabStyle'

type Props = {
  userId: string
}

export const DashboardMenu: React.FC<Props> = ({ userId }) => {
  const { questionsStyle, answerStyle, profileStyle } = MenuTabStyle()
  const dispatch = useAppDispatch()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  return (
    <div className=' flex w-full justify-center bg-white py-4'>
      <nav className=' container mx-auto'>
        <ul className=' flex list-none gap-x-5 pl-3 font-mono text-sm tracking-wide text-stone-500 opacity-50	'>
          <li>
            <QuestionTab
              userId={userId}
              path={`/myPage/question`}
              className={questionsStyle}
              tabWord='自分の質問'
              onClick={() => dispatch(changeMenubarTab({ ...currentMenuBarTabType, myPageMenu: 'myQuestion' }))}
            />
          </li>
          <li>
            <AnswerTab
              userId={userId}
              path={`/myPage/answer`}
              className={answerStyle}
              tabWord='自分の回答'
              onClick={() => dispatch(changeMenubarTab({ ...currentMenuBarTabType, myPageMenu: 'myAnswer' }))}
            />
          </li>
          <li>
            <ProfileTab
              userId={userId}
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
