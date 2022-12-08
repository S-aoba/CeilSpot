import { GrDocumentUser } from 'react-icons/gr'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUserInfo, setEditedUserInfo } from '../../../slices/userInfoSlice'

type Props = {
  self_introduction: string
}

export const SelfIntroduction: React.FC<Props> = ({ self_introduction }) => {
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)

  return (
    <div>
      <div className='mb-2 flex items-center gap-2'>
        <span>
          <GrDocumentUser />
        </span>
        <p>自己紹介</p>
      </div>
      <textarea
        className=' h-28 w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400 resize-none'
        placeholder='自己紹介を入力してください'
        defaultValue={self_introduction ? self_introduction : ''}
        onChange={(e) => dispatch(setEditedUserInfo({ ...editedUserInfo, self_introduction: e.target.value }))}
      />
    </div>
  )
}
