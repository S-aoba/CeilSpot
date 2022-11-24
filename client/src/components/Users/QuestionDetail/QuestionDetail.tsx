import { useLocation } from 'react-router-dom'
import { DetailCard } from './DetailCard'

import { AnswerItem } from '../AnswerItem/AnswerItem'
import { Base } from '../../shared/layout/Base'
import { DetailProfileCard } from './DetailProfileCard'
import { DetailTitle } from './DetailTitle'
import { AnswerForm } from '../AnswerReply/AnswerForm'
import { QuestionType } from '../../../types/types'
import { useQuerySingleQuestion } from '../../../Functional/UseQuery/useQuerySingleQuestion'
import { Error } from '../../Error/Error'
import { Loading } from '../../Loading/Loading'

export const QuestionDetail = () => {
  const location = useLocation()
  const { id } = location.state as QuestionType
  const {
    data: dataSingleQuestion,
    isLoading: isDataSingleQuestion,
    error: isErrorSingleQuestion,
  } = useQuerySingleQuestion(id)

  if (isErrorSingleQuestion) return <Error />
  if (isDataSingleQuestion) return <Loading />

  return (
    <Base id='questionDetail'>
      {dataSingleQuestion && (
        <>
          <DetailTitle>{dataSingleQuestion.title}</DetailTitle>
          <div className='flex flex-col gap-y-5 xl:grid xl:grid-cols-12'>
            <DetailCard
              id={dataSingleQuestion.id}
              title={dataSingleQuestion.title}
              body={dataSingleQuestion.body}
              post_username={dataSingleQuestion.post_username}
              answer_list={dataSingleQuestion.answer_list}
              tags={dataSingleQuestion.tags}
            />
            <DetailProfileCard tag={dataSingleQuestion.tags[0]} username={dataSingleQuestion.post_username} />
          </div>
          {dataSingleQuestion.answer_list.map((answer: string) => (
            <AnswerItem key={answer} answer_id={answer} />
          ))}
          <AnswerForm question_id={id} />
        </>
      )}
    </Base>
  )
}
