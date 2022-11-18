import { BsPatchQuestion, BsQuestionSquare } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'

type Props = {
  username: string
}

export const IconMenu: React.FC<Props> = ({ username }) => {
  return (
    <div className=' dropdown-hover dropdown-bottom dropdown-end dropdown'>
      <img tabIndex={0} src={DefaultUserIcon} alt='userIcon' className=' h-12 w-12 rounded-full hover:cursor-pointer' />
      <ul tabIndex={0} className='dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow '>
        <li>
          <Link to={`/dashboard/${username}/question`} relative='path' state={username} className=' hover:bg-sky-400 hover:text-white'>
            <span>
              <BsPatchQuestion />
            </span>
            <p>Users Question</p>
          </Link>
        </li>
        <li>
          <a className=' hover:bg-sky-400 hover:text-white'>
            <span>
              <BsQuestionSquare />
            </span>
            <p>My Question</p>
          </a>
        </li>
      </ul>
    </div>
  )
}