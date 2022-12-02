import { BsQuestionSquare, BsPatchExclamation } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { useAppDispatch } from '../../../app/hooks'
import { changeMenubarTab } from '../../../slices/appSlice'
import { MenuLinkTab as ProfileTab, MenuLinkTab as AnswerTab, MenuLinkTab as QuestionTab } from './DMenuLinkTab'
import { MenuTabStyle } from './DMenuTabStyle'

type Props = {
  userId: string
}

export const Menu: React.FC<Props> = ({ userId }) => {
  const { questionsStyle, answerStyle, profileStyle } = MenuTabStyle()
  const dispatch = useAppDispatch()
  return (
    <nav className='sticky col-span-3 mr-5'>
      <ul className=' flex h-full list-none flex-col items-end w-11/12 gap-10 pt-10 text-2xl'>
        <li className=''>
          <QuestionTab
            userId={userId}
            path={`/dashboard/question`}
            className={questionsStyle}
            icon={<BsQuestionSquare />}
            tabWord='Question'
            onClick={() => dispatch(changeMenubarTab('question'))}
          />
        </li>
        <li className=''>
          <AnswerTab
            userId={userId}
            path={`/dashboard/answer`}
            className={answerStyle}
            icon={<BsPatchExclamation />}
            tabWord='Answer'
            onClick={() => dispatch(changeMenubarTab('answer'))}
          />
        </li>
        <li className=''>
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