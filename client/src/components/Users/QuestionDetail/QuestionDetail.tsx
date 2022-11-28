import { useLocation, useOutletContext } from 'react-router-dom'
import { DetailCard } from './DetailCard'
import { AnswerItem } from '../AnswerItem/AnswerItem'
import { RootBase } from '../../shared/layout/RootBase'
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
  const isAuth = useOutletContext() as boolean

  return (
    <RootBase id='questionDetail'>
      <DetailTitle>{title}</DetailTitle>
      <div className='mb-3 flex w-full flex-col gap-y-5 xl:grid xl:grid-cols-12'>
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
      <AnswerItem answer_list={answer_list} />
      {isAuth ? (
        <AnswerForm question_id={id} />
      ) : (
        <div className=' w-full'>
          <hr className=' mb-5 w-9/12 border-gray-600' />
          <div className='flex w-9/12 justify-between gap-3'>
            <p className=' text-gray-400'>
              ログインすると質問やコメントが可能になります。
              <br />
              アカウント作成がまだの方は右上のSighUpでアカウントを無料新規作成してからログインをお願いします。
            </p>
          </div>
        </div>
      )}
    </RootBase>
  )
}
