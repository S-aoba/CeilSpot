import { BsPatchExclamation, BsQuestionSquare } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'
import { useProcessAuth } from '../../../functional/hooks/useProcessAuth'
import { useAppDispatch } from '../../../app/hooks'
import { changeMenubarTab } from '../../../slices/appSlice'
import { useQueryUserIdAndUsername } from '../../../functional/UseQuery/useQueryUserIdAndUsername'
import { Loading } from '../../shared/elements/Loading/Loading'
import { QuestionItem } from '../../Users/QuestionItem/QuestionItem'

export const IconMenu: React.FC = () => {
  const { logout } = useProcessAuth()
  const dispatch = useAppDispatch()
  const { data: userIdAndUsername, isLoading, error } = useQueryUserIdAndUsername()

  if (error) return <QuestionItem />
  if (isLoading) return <Loading />
  return (
    <>
      {userIdAndUsername && (
        <div className=' dropdown-hover dropdown-bottom dropdown-end dropdown'>
          <img
            tabIndex={0}
            src={DefaultUserIcon}
            alt='userIcon'
            className=' h-9 w-9 rounded-full hover:cursor-pointer'
          />
          <ul tabIndex={0} className='dropdown-content menu rounded-box w-52 gap-3 bg-base-100 p-2 shadow'>
            <li>
              <Link
                to={`/dashboard/question`}
                relative='path'
                className=' hover:bg-sky-400 hover:text-white'
                state={userIdAndUsername.userId}
                onClick={() => dispatch(changeMenubarTab('question'))}>
                <span>
                  <BsQuestionSquare />
                </span>
                <p>My Question</p>
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/answer`}
                relative='path'
                className=' hover:bg-sky-400 hover:text-white'
                state={userIdAndUsername.userId}
                onClick={() => dispatch(changeMenubarTab('answer'))}>
                <span>
                  <BsPatchExclamation />
                </span>
                <p>My Answer</p>
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/profile`}
                relative='path'
                className=' hover:bg-sky-400 hover:text-white'
                state={userIdAndUsername.userId}
                onClick={() => dispatch(changeMenubarTab('profile'))}>
                <span>
                  <CgProfile />
                </span>
                <p>My Profile</p>
              </Link>
            </li>
            <li>
              <div className='flex hover:bg-amber-300 hover:text-white' onClick={logout}>
                <span>
                  <BiLogOut />
                </span>
                <button className=' hover:cursor-pointer'>ログアウト</button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
