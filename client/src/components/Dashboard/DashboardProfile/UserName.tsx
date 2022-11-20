import { ImUser } from 'react-icons/im'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUserInfo, setEditedUserInfo } from '../../../slices/appSlice'

type Props = {
  username: string
}

export const UserName: React.FC<Props> = ({ username }) => {
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)

  return (
    <div>
      <div className=' mb-2 flex items-center gap-2'>
        <span>
          <ImUser />
        </span>
        <p>ユーザー名</p>
      </div>
      <input
        type='text'
        className=' w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
        defaultValue={`${username}`}
        onChange={(e) => dispatch(setEditedUserInfo({ ...editedUserInfo, username: e.target.value }))}
      />
    </div>
  )
}
