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
  const { data: singleQuestion, isLoading, error } = useQuerySingleQuestion(id)

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <>
      {singleQuestion && (
        <RootBase>
          <DetailTitle>{singleQuestion.title}</DetailTitle>
          <div className='mb-3 flex w-full flex-col gap-y-5 xl:grid xl:grid-cols-12'>
            <DetailCard
              id={singleQuestion.id}
              title={singleQuestion.title}
              body={singleQuestion.body}
              post_username={singleQuestion.post_username}
              answer_list={singleQuestion.answer_list}
              tags={singleQuestion.tags}
              isDashboard={isDashboard}
            />
            <DetailProfileCard username={singleQuestion.post_username} />
          </div>
          <AnswerItem answer_list={singleQuestion.answer_list} />
          {isAuth ? <AnswerForm question_id={singleQuestion.id} /> : <LogoutAnswerForm />}
        </RootBase>
      )}
    </>
  )
}
