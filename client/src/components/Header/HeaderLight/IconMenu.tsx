import { BiLogOut } from 'react-icons/bi'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'
import { useProcessAuth } from '../../../lib/reactQuery/userProcess/useProcessAuth'

export const IconMenu: React.FC = () => {
  const { logout } = useProcessAuth()

  return (
    <div className=' dropdown-hover dropdown-bottom dropdown-end dropdown'>
      <img tabIndex={0} src={DefaultUserIcon} alt='userIcon' className=' h-9 w-9 rounded-full hover:cursor-pointer' />
      <ul tabIndex={0} className='dropdown-content menu rounded-box w-52 gap-3 bg-base-100 p-2 text-gray-400 shadow'>
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
  )
}
