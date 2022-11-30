import { useLocation, useOutletContext } from 'react-router-dom'
import { DetailCard } from '../components/QDetail/DetailCard'
import { AnswerItem } from '../components/AItem/AItem'
import { RootBase } from '../components/shared/layout/RootBase'
import { DetailProfileCard } from '../components/QDetail/DetailProfileCard'
import { DetailTitle } from '../components/QDetail/DetailTitle'
import { AnswerForm } from '../components/AReply/AForm'
import { QuestionType } from '../types/types'
import { useQuerySingleQuestion } from '../functional/UseQuery/useQuerySingleQuestion'
import { Error } from '../components/shared/elements/Error/Error'
import { Loading } from '../components/shared/elements/Loading/Loading'
import { LogoutAnswerForm } from '../components/QDetail/LogoutAnswerForm'

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
          {isAuth ? <AnswerForm question_id={data.id} /> : <LogoutAnswerForm />}
        </RootBase>
      )}
    </>
  )
}
