import { AnswerCard } from './AnswerCard'

type Props = {
  answer_id: string
}

export const AnswerItem: React.FC<Props> = ({ answer_id }) => {
  return (
    <div className=' w-full'>
      <AnswerCard answer_id={answer_id} />
    </div>
  )
}
