import { BsPatchQuestion, BsQuestionSquare } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'
import { useProcessAuth } from '../../../Functional/hooks/useProcessAuth'
import { ModalBtn as LogoutBtn } from '../../shared/elements/ModalBtn'

export const IconMenu: React.FC = () => {
  const { logout } = useProcessAuth()

  return (
    <div className=' dropdown-hover dropdown-bottom dropdown-end dropdown'>
      <img tabIndex={0} src={DefaultUserIcon} alt='userIcon' className=' h-12 w-12 rounded-full hover:cursor-pointer' />
      <ul tabIndex={0} className='dropdown-content menu rounded-box w-52 gap-3 bg-base-100 p-2 shadow'>
        <li>
          <Link to={`/dashboard/question`} relative='path' className=' hover:bg-sky-400 hover:text-white'>
            <span>
              <BsPatchQuestion />
            </span>
            <p>My Question</p>
          </Link>
        </li>
        <li>
          <Link to={`/dashboard/answer`} relative='path' className=' hover:bg-sky-400 hover:text-white'>
            <span>
              <BsQuestionSquare />
            </span>
            <p>My Answer</p>
          </Link>
        </li>
        <li>
          <Link to={`/dashboard/profile`} relative='path' className=' hover:bg-sky-400 hover:text-white'>
            <span>
              <CgProfile />
            </span>
            <p>My Profile</p>
          </Link>
        </li>
        <li>
          <div className='flex hover:bg-amber-300 hover:text-white'>
            <span>
              <BiLogOut />
            </span>
            <button className=' hover:cursor-pointer' onClick={logout}>
              ログアウト
            </button>
          </div>
        </li>
      </ul>
    </div>
  )
}
