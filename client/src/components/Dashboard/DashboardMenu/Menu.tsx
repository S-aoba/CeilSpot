import { BsQuestionSquare, BsPatchExclamation } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { useAppDispatch } from '../../../app/hooks'
import { changeMenubarTab } from '../../../slices/appSlice'
import { MenuLinkTab as ProfileTab, MenuLinkTab as AnswerTab, MenuLinkTab as QuestionTab } from './MenuLinkTab'
import { MenuTabStyle } from './MenuTabStyle'

type Props = {
  userId: string
}

export const Menu: React.FC<Props> = ({ userId }) => {
  const { questionsStyle, answerStyle, profileStyle } = MenuTabStyle()
  const dispatch = useAppDispatch()
  return (
    <nav className='flex h-10 w-11/12 justify-center rounded-3xl bg-white'>
      <ul className=' flex h-full w-full list-none items-center justify-center'>
        <li className=' flex h-full items-center'>
          <QuestionTab
            userId={userId}
            path={`/dashboard/question`}
            className={questionsStyle}
            icon={<BsQuestionSquare />}
            tabWord='Question'
            onClick={() => dispatch(changeMenubarTab('question'))}
          />
        </li>
        <li className=' flex h-full items-center'>
          <AnswerTab
            userId={userId}
            path={`/dashboard/answer`}
            className={answerStyle}
            icon={<BsPatchExclamation />}
            tabWord='Answer'
            onClick={() => dispatch(changeMenubarTab('answer'))}
          />
        </li>
        <li className=' flex h-full items-center'>
          <ProfileTab
            userId={userId}
            path={`/dashboard/profile`}
            className={profileStyle}
            icon={<CgProfile />}
            tabWord='Profile'
            onClick={() => dispatch(changeMenubarTab('profile'))}
          />
        </li>
      </ul>
    </nav>
  )
}
