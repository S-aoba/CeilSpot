import LanguageIcon from '../../../assets/LanguageIcon/python.png'
import { Title } from '../../shared/elements/Title'
import { useLocation } from 'react-router-dom'
import { DetailCard } from './DetailCard'
import { AnswerReply } from '../AnswerReply/AnswerReply'
import { useQuerySingleQuestion } from '../../shared/hooks/UseQuery/useQuerySingleQuestion'
import { AnswerItem } from '../AnswerItem/AnswerItem'
import { useSelectQuestionIcon } from '../../shared/hooks/useSelectQuestionIcon'

type State = {
  id: string
}
export const QuestionDetail = () => {
  const location = useLocation()
  const { id: question_id } = location.state as State
  const { data: dataQuestion } = useQuerySingleQuestion(question_id)
  const { selectQuestionIcon } = useSelectQuestionIcon()

  return (
    <div id='detail' className=' flex h-fit min-h-screen flex-col items-center py-20 lg:container lg:mx-auto'>
      <Title className=' w-11/12 py-3 text-3xl font-bold xl:w-8/12'>Question Detail</Title>
      <div className=' flex h-fit w-11/12 flex-col items-center justify-center gap-8 py-5'>
        <div>
          <img
            src={selectQuestionIcon(dataQuestion?.tags[0] as string)}
            alt='languageIcon'
            className=' h-24 w-24 rounded-full'
          />
        </div>
        <DetailCard question_id={question_id} />
      </div>
      <AnswerReply question_id={question_id} />
      {dataQuestion?.answer_list.map((answer) => (
        <AnswerItem key={answer} answer_id={answer} />
      ))}
    </div>
  )
}
