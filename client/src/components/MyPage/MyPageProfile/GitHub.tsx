import { FaGithub } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { selectUserInfo, setEditedUserInfo } from '../../../store/slices/userInfoSlice'

type Props = {
  githubURL: string
}
export const GitHub: React.FC<Props> = ({ githubURL }) => {
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)
  return (
    <div className='col-span-1 '>
      <div className=' mb-2 flex items-center gap-2'>
        <FaGithub />
        <p>Github</p>
      </div>
      <input
        type='text'
        className=' w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
        defaultValue={githubURL ? githubURL : ''}
        placeholder='githubURL'
        onChange={(e) => dispatch(setEditedUserInfo({ ...editedUserInfo, github: e.target.value }))}
      />
    </div>
  )
}
