import { useMutateAnswer } from '../../shared/hooks/useMutateAnswer'
import { AnswerType } from '../../shared/types/types'

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
    <div className=' col-span-1 grid h-fit w-full grid-cols-12 rounded-xl bg-red-50'>
      <div className=' col-span-9 grid grid-rows-6 px-3'>
        <div className=' row-span-4 flex items-center'>
          <p className=' text-lg font-semibold line-clamp-2 lg:line-clamp-3'>{body}</p>
        </div>
        <div className='row-span-2 flex items-center gap-3'>
          <div className=' w-40'>
            <p className=' truncate text-sm'>{respondent_username}</p>
          </div>
          <p className=' text-sm text-gray-400'>29日前</p>
          <button onClick={() => deleteAnswerMutation.mutate(id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
