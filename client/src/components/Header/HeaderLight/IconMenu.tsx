import { BsPatchQuestion, BsQuestionSquare } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'
import { useQueryUserInfo } from '../../shared/hooks/UseQuery/useQueryUserInfo'
import { UserInfo } from '../../shared/types/types'

export const IconMenu: React.FC<UserInfo> = ({ username, self_introduction, twitter, github, website }) => {
  return (
    <div className=' dropdown-hover dropdown-bottom dropdown-end dropdown'>
      <img tabIndex={0} src={DefaultUserIcon} alt='userIcon' className=' h-12 w-12 rounded-full hover:cursor-pointer' />
      <ul tabIndex={0} className='dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow '>
        <li>
          <Link
            to={`/dashboard/${username}/question`}
            relative='path'
            state={username}
            className=' hover:bg-sky-400 hover:text-white'>
            <span>
              <BsPatchQuestion />
            </span>
            <p>My Question</p>
          </Link>
        </li>
        <li>
          <Link
            to={`/dashboard/${username}/answer`}
            relative='path'
            state={username}
            className=' hover:bg-sky-400 hover:text-white'>
            <span>
              <BsQuestionSquare />
            </span>
            <p>My Answer</p>
          </Link>
        </li>
        <li>
          <Link
            to={`/dashboard/${username}/profile`}
            relative='path'
            className=' hover:bg-sky-400 hover:text-white'
            state={{ username, self_introduction, twitter, github, website }}>
            <span>
              <CgProfile />
            </span>
            <p>My Profile</p>
          </Link>
        </li>
      </ul>
    </div>
  )
}
