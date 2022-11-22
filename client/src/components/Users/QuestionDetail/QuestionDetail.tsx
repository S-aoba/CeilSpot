import { Title } from '../../shared/elements/Title'
import { useLocation } from 'react-router-dom'
import { DetailCard } from './DetailCard'
import { useQuerySingleQuestion } from '../../shared/hooks/UseQuery/useQuerySingleQuestion'
import { AnswerItem } from '../AnswerItem/AnswerItem'
import { Base } from '../../shared/layout/Base'
import { DetailProfileCard } from './DetailProfileCard'
import { DetailTitle } from './DetailTitle'
import { AnswerForm } from '../AnswerReply/AnswerForm'

type State = {
  id: string
}
export const QuestionDetail = () => {
  const location = useLocation()
  const { id: question_id } = location.state as State
  const { data: dataQuestion, isLoading: isDataQuestionLoading } = useQuerySingleQuestion(question_id)
  if (isDataQuestionLoading)
    return (
      <div>
        <p>isLoading...</p>
      </div>
    )

  return (
    <Base id='questionDetail'>
      <Title>Question Detail</Title>
      <DetailTitle>{dataQuestion?.title}</DetailTitle>
      <div className='flex flex-col gap-y-5 xl:grid xl:grid-cols-12'>
        <DetailCard question_id={question_id} />
        <DetailProfileCard tag={dataQuestion?.tags[0]!} username={dataQuestion?.post_username!} />
      </div>
      {dataQuestion?.answer_list.length! > 0 && <Title>Answer List</Title>}
      {dataQuestion?.answer_list &&
        dataQuestion?.answer_list.map((answer) => <AnswerItem key={answer} answer_id={answer} />)}
      <Title>Answer Form</Title>
      <AnswerForm question_id={question_id} />
    </Base>
  )
}
