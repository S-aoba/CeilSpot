import { useLocation, useOutletContext } from 'react-router-dom'
import { DetailCard } from './DetailCard'
import { AnswerItem } from '../AnswerItem/AnswerItem'
import { RootBase } from '../../shared/layout/RootBase'
import { DetailProfileCard } from './DetailProfileCard'
import { DetailTitle } from './DetailTitle'
import { AnswerForm } from '../AnswerReply/AnswerForm'
import { QuestionType } from '../../../types/types'
import { useQuerySingleQuestion } from '../../../functional/UseQuery/useQuerySingleQuestion'
import { Error } from '../../shared/elements/Error/Error'
import { Loading } from '../../shared/elements/Loading/Loading'

type State = {
  isDashboard: boolean
} & QuestionType

export const QuestionDetail = () => {
  const location = useLocation()
  const isAuth = useOutletContext() as boolean
  const { id, isDashboard } = location.state as State
  const { data, isLoading, error } = useQuerySingleQuestion(id)

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <>
      {data && (
        <RootBase id='questionDetail'>
          <DetailTitle>{data.title}</DetailTitle>
          <div className='mb-3 flex w-full flex-col gap-y-5 xl:grid xl:grid-cols-12'>
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
          <AnswerItem answer_list={data.answer_list} />
          {isAuth ? (
            <AnswerForm question_id={data.id} />
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
      )}
    </>
  )
}
