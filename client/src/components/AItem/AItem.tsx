import { AnswerCard } from './ACard'

type Props = {
  answer_list: string[]
}

export const AnswerItem: React.FC<Props> = ({ answer_list }) => {
  return (
    <div className=' mb-3 flex w-full flex-col justify-center xl:justify-start'>
      {answer_list.map((answer_id: string) => (
        <AnswerCard key={answer_id} answer_id={answer_id} />
      ))}
    </div>
  )
}
