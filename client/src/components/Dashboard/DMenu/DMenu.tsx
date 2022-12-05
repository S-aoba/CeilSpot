import { useAppDispatch } from '../../../app/hooks'
import { changeMenubarTab } from '../../../slices/appSlice'
import { MenuLinkTab as ProfileTab, MenuLinkTab as AnswerTab, MenuLinkTab as QuestionTab } from './DMenuLinkTab'
import { MenuTabStyle } from './DMenuTabStyle'

type Props = {
  userId: string
}

export const DashboardMenu: React.FC<Props> = ({ userId }) => {
  const { questionsStyle, answerStyle, profileStyle } = MenuTabStyle()
  const dispatch = useAppDispatch()
  return (
    <div className=' flex w-full justify-center bg-white py-4'>
      <nav className=' container mx-auto'>
        <ul className=' flex list-none gap-x-5 pl-3 font-mono text-sm tracking-wide text-stone-500 opacity-50	'>
          <li>
            <QuestionTab
              userId={userId}
              path={`/dashboard/question`}
              className={questionsStyle}
              tabWord='投稿した質問'
              onClick={() => dispatch(changeMenubarTab('question'))}
            />
          </li>
          <li>
            <AnswerTab
              userId={userId}
              path={`/dashboard/answer`}
              className={answerStyle}
              tabWord='回答した質問'
              onClick={() => dispatch(changeMenubarTab('answer'))}
            />
          </li>
          <li>
            <ProfileTab
              userId={userId}
              path={`/dashboard/profile`}
              className={profileStyle}
              tabWord='プロフィール'
              onClick={() => dispatch(changeMenubarTab('profile'))}
            />
          </li>
        </ul>
      </nav>
    </div>
  )
}
