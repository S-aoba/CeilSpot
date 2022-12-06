import { BsQuestionSquare } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineComment } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'
import { useAppDispatch } from '../../../app/hooks'
import { changeMenubarTab } from '../../../slices/appSlice'
import { useQueryUserIdAndUsername } from '../../../functional/UseQuery/useQueryUserIdAndUsername'
import { Loading } from '../../shared/elements/Loading/Loading'
import { QuestionList } from '../../../pages/QList'
import { useProcessAuth } from '../../../functional/hooks/UserProcess/useProcessAuth'

export const IconMenu: React.FC = () => {
  const { logout } = useProcessAuth()
  const dispatch = useAppDispatch()
  const { data: userIdAndUsername, isLoading, error } = useQueryUserIdAndUsername()

  if (error) return <QuestionList />
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
          <ul
            tabIndex={0}
            className='dropdown-content menu rounded-box w-52 gap-3 bg-base-100 p-2 text-gray-400 shadow'
          >
            <li>
              <Link
                to={`/dashboard/question`}
                relative='path'
                className='text-base hover:bg-gray-100 hover:text-black focus:bg-white active:bg-gray-100'
                state={userIdAndUsername.userId}
                onClick={() => dispatch(changeMenubarTab('question'))}
              >
                <span>
                  <BsQuestionSquare />
                </span>
                <p>投稿した質問</p>
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/answer`}
                relative='path'
                className=' text-base hover:bg-gray-100 hover:text-black focus:bg-white active:bg-gray-100'
                state={userIdAndUsername.userId}
                onClick={() => dispatch(changeMenubarTab('answer'))}
              >
                <span>
                  <AiOutlineComment />
                </span>
                <p>回答した質問</p>
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/profile`}
                relative='path'
                className=' text-base hover:bg-gray-100 hover:text-black focus:bg-white active:bg-gray-100'
                state={userIdAndUsername.userId}
                onClick={() => dispatch(changeMenubarTab('profile'))}
              >
                <span>
                  <CgProfile />
                </span>
                <p>プロフィール</p>
              </Link>
            </li>
            <li>
              <div
                className='flex text-base hover:bg-gray-100 hover:text-black focus:bg-white active:bg-gray-100'
                onClick={logout}
              >
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
