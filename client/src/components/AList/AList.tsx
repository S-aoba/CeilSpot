import { AnswerCountResponse } from './ACountResponse'
import { AnswerItem } from './AItem'

type AnswerListProps = {
  answer_list: string[]
}

export const AnswerList: React.FC<AnswerListProps> = ({ answer_list }) => {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <AnswerCountResponse answer_list={answer_list} />
      {answer_list.map((answer_id: string) => (
        <AnswerItem key={answer_id} answer_id={answer_id} />
      ))}
    </div>
  )
}
