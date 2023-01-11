import { ImUser } from 'react-icons/im'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { useMutateUserInfo } from '../../../lib/reactQuery/useMutate/useMutateUserInfo'
import { selectUserInfo, setEditedUserInfo } from '../../../store/slices/userInfoSlice'
import { ModalBtn } from '../../shared/elements/ModalBtn'

type Props = {
  userId: string
  username: string
}

export const UserName: React.FC<Props> = ({ userId, username }) => {
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)
  const { renameUsernameMutation } = useMutateUserInfo()
  return (
    <div className='w-full py-2'>
      <div className=' mb-2 flex items-center gap-2'>
        <span>
          <ImUser />
        </span>
        <p>ユーザー名</p>
      </div>
      <div className=' flex gap-x-5'>
        <input
          type='text'
          className=' w-5/12 rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
          defaultValue={`${username}`}
          onChange={(e) => dispatch(setEditedUserInfo({ ...editedUserInfo, username: e.target.value }))}
        />
        <ModalBtn
          className=' btn-warning btn text-white hover:opacity-75'
          modalName='rename'
          modalTitle='本当に変更しますか？'
          modalDescription='ユーザーネームを変更すると、意図しない副作用が生じることがあります。例えば、変更前のユーザー名によって生成されたリンクを他のサイト（Twitter等）に貼っている場合、それは機能しなくなります。

          変更前のユーザーネームのプロフィールに対して、リダイレクトは設定されません。
          変更前のユーザーネームに関係するページに対して、リダイレクトは設定されません。
          ユーザー名を変更すると、変更前のユーザー名は誰でも利用できるようになります。
          以上の点に関して、十分に注意してください。'
          onClick={() => renameUsernameMutation.mutate(userId)}
        >
          変更する
        </ModalBtn>
      </div>
    </div>
  )
}
