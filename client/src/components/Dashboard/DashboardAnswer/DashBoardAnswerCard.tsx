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
    <div className=' col-span-1 flex w-full rounded-xl bg-white px-5 py-5'>
      <div className=' flex w-full justify-between'>
        <div className=' w-9/12 line-clamp-1'>
          <p>{body}</p>
        </div>
        <div className=' flex gap-3'>
          <span>30日前</span>
          <DeleteBtn
            modalTitle='削除してもよろしいですか？'
            children={<MdDeleteOutline className=' h-7 w-7 text-sky-400 hover:cursor-pointer hover:opacity-75' />}
            modalName='delete'
            onClick={() => deleteAnswerMutation.mutate(id)}
          />
        </div>
      </div>
    </div>
  )
}
