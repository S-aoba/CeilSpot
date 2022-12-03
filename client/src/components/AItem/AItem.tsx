import { AnswerCard } from './ACard'

type Props = {
  answer_list: string[]
}

export const AnswerItem: React.FC<Props> = ({ answer_list }) => {
  return (
    <div className=' flex flex-col justify-center items-center'>
      {answer_list.length > 0 ? (
        <div className=' mb-8 font-mono text-3xl tracking-widest'>
          <p>
            <span className=' text-sky-400'>{answer_list.length}</span>
            件の回答
          </p>
        </div>
      ) : (
        <div className=' mb-8 font-mono text-xl tracking-widest'>
          <p>まだ回答はありません</p>
        </div>
      )}
      {answer_list.map((answer_id: string) => (
        <AnswerCard key={answer_id} answer_id={answer_id} />
      ))}
    </div>
  )
}
