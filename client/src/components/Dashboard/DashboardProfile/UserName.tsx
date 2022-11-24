import { ImUser } from 'react-icons/im'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useMutateUserInfo } from '../../../Functional/hooks/useMutateUserInfo'
import { selectUserInfo, setEditedUserInfo } from '../../../slices/appSlice'
import { ModalBtn } from '../../shared/elements/ModalBtn'

type Props = {
  username: string
}

export const UserName: React.FC<Props> = ({ username }) => {
  const dispatch = useAppDispatch()
  const editedUserInfo = useAppSelector(selectUserInfo)
  const { changeUsernameMutation } = useMutateUserInfo()
  return (
    <div className=' w-9/12'>
      <div className=' mb-2 flex items-center gap-2'>
        <span>
          <ImUser />
        </span>
        <p>ユーザー名</p>
      </div>
      <div className=' flex gap-3'>
        <input
          type='text'
          className=' w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
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
          onClick={() => changeUsernameMutation.mutate(editedUserInfo.id!)}>
          変更する
        </ModalBtn>
      </div>
    </div>
  )
}
