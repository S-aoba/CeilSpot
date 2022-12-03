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
    <div className=' flex w-full justify-center py-5'>
      <div className=' w-10/12'>
        <nav>
          <ul className=' flex list-none items-end gap-5 border-b-2 py-2 text-xl text-gray-400'>
            <li>
              <QuestionTab
                userId={userId}
                path={`/dashboard/question`}
                className={questionsStyle}
                icon={<BsQuestionSquare />}
                tabWord='Question'
                onClick={() => dispatch(changeMenubarTab('question'))}
              />
            </li>
            <li>
              <AnswerTab
                userId={userId}
                path={`/dashboard/answer`}
                className={answerStyle}
                icon={<BsPatchExclamation />}
                tabWord='Answer'
                onClick={() => dispatch(changeMenubarTab('answer'))}
              />
            </li>
            <li>
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
      </div>
    </div>
  )
}
