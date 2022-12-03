import { AnswerForm } from './AForm'

type AnswerReplyProps = {
  question_id: string
}
export const AnswerReply: React.FC<AnswerReplyProps> = ({ question_id }) => {
  return (
    <div className=' w-11/12 lg:w-full'>
      <AnswerForm question_id={question_id} />
    </div>
  )
}
