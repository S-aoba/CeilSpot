import { MdDeleteOutline } from 'react-icons/md'
import { useMutateAnswer } from '../../shared/hooks/useMutateAnswer'
import { AnswerType } from '../../shared/types/types'
import { ModalBtn as DeleteBtn } from '../../shared/elements/ModalBtn'

type LinkPathProps = {
  path: string
} & AnswerType

export const DashBoardAnswerCard: React.FC<LinkPathProps & AnswerType> = ({
  path,
  id,
  body,
  question_id,
  respondent_username,
}) => {
  const { deleteAnswerMutation } = useMutateAnswer(question_id)
  return (
    <div className=' col-span-1 grid h-40 w-full grid-rows-6 rounded-xl bg-white'>
      <div className=' row-span-4 px-3 py-3'>
        <p className=' text-lg font-semibold line-clamp-2 lg:line-clamp-3'>{body}</p>
      </div>
      <div className='row-span-2 flex w-full items-center justify-end gap-3'>
        <div className=' w-40'>
          <p className=' truncate text-sm'>{respondent_username}</p>
        </div>
        <p className=' text-sm text-gray-400'>29日前</p>
        <DeleteBtn
          modalTitle='削除してもよろしいですか？'
          children={<MdDeleteOutline className=' h-10 w-10 text-sky-400 hover:cursor-pointer hover:opacity-75' />}
          modalName='delete'
          onClick={() => deleteAnswerMutation.mutate(id)}
        />
      </div>
    </div>
  )
}
