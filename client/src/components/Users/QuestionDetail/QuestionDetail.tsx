import { useLocation } from 'react-router-dom'
import { DetailCard } from './DetailCard'

import { AnswerItem } from '../AnswerItem/AnswerItem'
import { Base } from '../../shared/layout/Base'
import { DetailProfileCard } from './DetailProfileCard'
import { DetailTitle } from './DetailTitle'
import { AnswerForm } from '../AnswerReply/AnswerForm'
import { QuestionType } from '../../../types/types'
import { useQuerySingleQuestion } from '../../../functional/UseQuery/useQuerySingleQuestion'
import { title } from '@uiw/react-md-editor'
import { Loading } from '../../Loading/Loading'

type State = {
  id: string
  isDashboard: boolean
}

export const QuestionDetail = () => {
  const location = useLocation()
  const { id, isDashboard } = location.state as State
  const { data, isLoading } = useQuerySingleQuestion(id)
  if (isLoading) return <Loading />
  return (
    <Base id='questionDetail'>
      {data && (
        <>
          <DetailTitle>{data.title}</DetailTitle>
          <div className='flex w-full flex-col gap-y-5 xl:grid xl:grid-cols-12'>
            <DetailCard
              id={data.id}
              title={data.title}
              body={data.body}
              post_username={data.post_username}
              answer_list={data.answer_list}
              tags={data.tags}
              isDashboard={isDashboard}
            />
            <DetailProfileCard tag={data.tags[0]} username={data.post_username} />
          </div>
          {data && data.answer_list.map((answer: string) => <AnswerItem key={answer} answer_id={answer} />)}
          <AnswerForm question_id={id} />
        </>
      )}
    </Base>
  )
}
