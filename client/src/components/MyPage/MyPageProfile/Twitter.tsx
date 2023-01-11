import { FaTwitter } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { selectUserInfo, setEditedUserInfo } from '../../../store/slices/userInfoSlice'
type Props = {
  twitterURL: string
}
export const Twitter: React.FC<Props> = ({ twitterURL }) => {
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)
  return (
    <div className='col-span-1'>
      <div className=' mb-2 flex items-center gap-2'>
        <FaTwitter color='#1DA1F2' />
        <p>Twitter</p>
      </div>
      <input
        type='text'
        className=' w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
        defaultValue={twitterURL ? twitterURL : ''}
        placeholder='twitterURL'
        onChange={(e) => dispatch(setEditedUserInfo({ ...editedUserInfo, twitter: e.target.value }))}
      />
    </div>
  )
}
