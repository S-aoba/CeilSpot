import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useMutateAnswer } from '../../../functional/hooks/useMutateAnswer'
import { useQuerySingleQuestion } from '../../../functional/UseQuery/useQuerySingleQuestion'
import { AnswerType } from '../../../types/types'
import { Error } from '../../Error/Error'
import { Loading } from '../../Loading/Loading'
import { ModalBtn as DeleteBtn } from '../../shared/elements/ModalBtn'

export const DashBoardAnswerCard: React.FC<AnswerType> = ({ id, body, question_id, respondent_username }) => {
  const { deleteAnswerMutation } = useMutateAnswer()
  const { data: dataQuestion, isLoading: isDataQuestionLoading, error } = useQuerySingleQuestion(question_id)
  if (error) return <Error />
  if (isDataQuestionLoading) return <Loading />

  return (
    <div className=' col-span-1 flex w-full rounded-xl bg-white px-5 py-5'>
      <div className=' flex w-full justify-between'>
        <div className=' w-9/12 line-clamp-1'>
          <Link
            to={`/question/${dataQuestion?.post_username}/${dataQuestion?.id}`}
            state={{
              id: dataQuestion?.id,
            }}>
            <p className=' hover:text-sky-400'>{body}</p>
          </Link>
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
