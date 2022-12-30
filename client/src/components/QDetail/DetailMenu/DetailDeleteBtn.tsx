import { FiDelete } from 'react-icons/fi'
import { useMutateQuestion } from '../../../useQuery/useMutate/useMutateQuestion'

type DetailDeleteBtnProps = {
  questionId: string
}

export const DetailDeleteBtn: React.FC<DetailDeleteBtnProps> = ({ questionId }) => {
  const { deleteQuestionMutation } = useMutateQuestion()

  return (
    <div
      className=' w-full justify-center hover:bg-sky-400 hover:text-white'
      onClick={() => {
        deleteQuestionMutation.mutate(questionId)
      }}
    >
      <FiDelete className=' h-5 w-5' />
      <p>削除する</p>
    </div>
  )
}
