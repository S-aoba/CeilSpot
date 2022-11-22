import { Title } from '../../shared/elements/Title'
import { useLocation } from 'react-router-dom'
import { DetailCard } from './DetailCard'
import { AnswerReply } from '../AnswerReply/AnswerReply'
import { useQuerySingleQuestion } from '../../shared/hooks/UseQuery/useQuerySingleQuestion'
import { AnswerItem } from '../AnswerItem/AnswerItem'
import { useSelectQuestionIcon } from '../../shared/hooks/useSelectQuestionIcon'
import { Base } from '../../shared/layout/Base'

type State = {
  id: string
}
export const QuestionDetail = () => {
  const location = useLocation()
  const { id: question_id } = location.state as State
  const { data: dataQuestion } = useQuerySingleQuestion(question_id)
  const { selectQuestionIcon } = useSelectQuestionIcon()

  return (
    <Base id='questionDetail'>
      <Title>Question Detail</Title>
      <div className=' flex h-fit w-11/12 flex-col items-center justify-center gap-8 py-5'>
        <div className=' rounded-xl bg-white py-5 px-5'>
          <img src={selectQuestionIcon(dataQuestion?.tags[0] as string)} alt='languageIcon' className=' h-24 w-24' />
        </div>
        <DetailCard question_id={question_id} />
      </div>
      {dataQuestion?.answer_list.map((answer) => (
        <AnswerItem key={answer} answer_id={answer} />
      ))}
      <AnswerReply question_id={question_id} />
    </Base>
  )
}
