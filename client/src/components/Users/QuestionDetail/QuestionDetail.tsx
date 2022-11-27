import { useLocation } from 'react-router-dom'
import { DetailCard } from './DetailCard'

import { AnswerItem } from '../AnswerItem/AnswerItem'
import { Base } from '../../shared/layout/Base'
import { DetailProfileCard } from './DetailProfileCard'
import { DetailTitle } from './DetailTitle'
import { AnswerForm } from '../AnswerReply/AnswerForm'
import { useQuerySingleQuestion } from '../../../functional/UseQuery/useQuerySingleQuestion'
import { Loading } from '../../Loading/Loading'
import { Error } from '../../Error/Error'

type State = {
  id: string
  isDashboard: boolean
}

export const QuestionDetail = () => {
  const location = useLocation()
  const { id, isDashboard } = location.state as State
  const { data: dataSingleQuestion, isLoading, error } = useQuerySingleQuestion(id)
  if (error) return <Error />
  if (isLoading) return <Loading />
  return (
    <Base id='questionDetail'>
      {dataSingleQuestion && (
        <>
          <DetailTitle>{dataSingleQuestion.title}</DetailTitle>
          <div className='flex w-full flex-col gap-y-5 xl:grid xl:grid-cols-12'>
            <DetailCard
              id={dataSingleQuestion.id}
              title={dataSingleQuestion.title}
              body={dataSingleQuestion.body}
              post_username={dataSingleQuestion.post_username}
              answer_list={dataSingleQuestion.answer_list}
              tags={dataSingleQuestion.tags}
              isDashboard={isDashboard}
            />
            <DetailProfileCard tag={dataSingleQuestion.tags[0]} username={dataSingleQuestion.post_username} />
          </div>
          {dataSingleQuestion &&
            dataSingleQuestion.answer_list.map((answer: string) => <AnswerItem key={answer} answer_id={answer} />)}
          <AnswerForm question_id={id} />
        </>
      )}
    </Base>
  )
}
