import { useLocation } from 'react-router-dom'
import { DetailCard } from './DetailCard'

import { AnswerItem } from '../AnswerItem/AnswerItem'
import { Base } from '../../shared/layout/Base'
import { DetailProfileCard } from './DetailProfileCard'
import { DetailTitle } from './DetailTitle'
import { AnswerForm } from '../AnswerReply/AnswerForm'
import { QuestionType } from '../../../types/types'

export const QuestionDetail = () => {
  const location = useLocation()
  const { id, title, body, post_username, answer_list, tags } = location.state as QuestionType

  return (
    <Base id='questionDetail'>
      <DetailTitle>{title}</DetailTitle>
      <div className='flex flex-col gap-y-5 xl:grid xl:grid-cols-12'>
        <DetailCard
          id={id}
          title={title}
          body={body}
          post_username={post_username}
          answer_list={answer_list}
          tags={tags}
        />
        <DetailProfileCard tag={tags[0]!} username={post_username} />
      </div>
      {answer_list && answer_list.map((answer) => <AnswerItem key={answer} answer_id={answer} />)}
      <AnswerForm question_id={id} />
    </Base>
  )
}
