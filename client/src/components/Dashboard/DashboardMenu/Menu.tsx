import { BsQuestionSquare, BsPatchExclamation } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { MenuLinkTab as ProfileTab, MenuLinkTab as AnswerTab, MenuLinkTab as QuestionTab } from './MenuLinkTab'

type Props = {
  username: string
}

export const Menu: React.FC<Props> = ({ username }) => {
  const listStyle =
    'hover:underline-sky-400 flex h-full w-36 items-center gap-2 px-3 py-2 text-gray-400 hover:cursor-pointer hover:text-sky-400 hover:underline hover:underline-offset-8'
  return (
    <nav className='flex h-10 w-11/12 justify-center rounded-3xl bg-white'>
      <ul className=' flex h-full w-full list-none items-center justify-center'>
        <li className=' flex h-full items-center'>
          <QuestionTab
            username={username}
            path={`/dashboard/${username}/question`}
            className={listStyle}
            icon={<BsQuestionSquare />}
            tabWord='Question'
          />
        </li>
        <li className=' flex h-full items-center'>
          <AnswerTab
            username={username}
            path={`/dashboard/${username}/answer`}
            className={listStyle}
            icon={<BsPatchExclamation />}
            tabWord='Answer'
          />
        </li>
        <li className=' flex h-full items-center'>
          <ProfileTab
            username={username}
            path={`/dashboard/${username}/profile`}
            className={listStyle}
            icon={<CgProfile />}
            tabWord='Profile'
          />
        </li>
      </ul>
    </nav>
  )
}
