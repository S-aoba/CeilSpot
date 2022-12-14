import { CgWebsite } from 'react-icons/cg'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { selectUserInfo, setEditedUserInfo } from '../../../store/slices/userInfoSlice'
type Props = {
  websiteURL: string
}

export const WebSite: React.FC<Props> = ({ websiteURL }) => {
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)
  return (
    <div className='w-full py-2'>
      <div className=' mb-2 flex items-center gap-2'>
        <CgWebsite className=' text-green-500' />
        <p>Website</p>
      </div>
      <input
        type='text'
        className=' w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
        defaultValue={websiteURL ? websiteURL : ''}
        placeholder='websiteURL'
        onChange={(e) => dispatch(setEditedUserInfo({ ...editedUserInfo, website: e.target.value }))}
      />
    </div>
  )
}
