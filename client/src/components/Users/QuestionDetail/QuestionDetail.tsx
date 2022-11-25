import { useLocation } from 'react-router-dom'
import { DetailCard } from './DetailCard'

import { AnswerItem } from '../AnswerItem/AnswerItem'
import { Base } from '../../shared/layout/Base'
import { DetailProfileCard } from './DetailProfileCard'
import { DetailTitle } from './DetailTitle'
import { AnswerForm } from '../AnswerReply/AnswerForm'
import { QuestionType } from '../../../types/types'

type State = {
  isDashboard: boolean
} & QuestionType

export const QuestionDetail = () => {
  const location = useLocation()
  const { id, title, body, post_username, answer_list, tags, isDashboard } = location.state as State

  return (
    <Base id='questionDetail'>
      <DetailTitle>{title}</DetailTitle>
      <div className='flex w-full flex-col gap-y-5 xl:grid xl:grid-cols-12'>
        <DetailCard
          id={id}
          title={title}
          body={body}
          post_username={post_username}
          answer_list={answer_list}
          tags={tags}
          isDashboard={isDashboard}
        />
        <DetailProfileCard tag={tags[0]} username={post_username} />
      </div>
      {answer_list.map((answer: string) => (
        <AnswerItem key={answer} answer_id={answer} />
      ))}
      <AnswerForm question_id={id} />
    </Base>
  )
}
