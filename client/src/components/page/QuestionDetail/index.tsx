import { useLayoutEffect } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import { useQuerySingleQuestion } from '../../../lib/reactQuery/useQuery/useQuerySingleQuestion'
import { QuestionType } from '../../../types'
import { AnswerList } from '../../AList/AList'
import { AnswerReply } from '../../AReply/AReply'
import { useScreen } from '../../hooks/useScreen'
import { DetailCard } from '../../QDetail/DetailCard'
import { DetailProfileCard } from '../../QDetail/DetailProfileCard'
import { DetailTitle } from '../../QDetail/DetailTitle'
import { LogoutAnswerForm } from '../../QDetail/LogoutAnswerForm'
import { Error } from '../../shared/elements/Error/Error'
import { Loading } from '../../shared/elements/Loading/Loading'
import { RootBase } from '../../shared/layout/RootBase'

type State = {
  isDashboard: boolean
} & QuestionType

export const QuestionDetail = () => {
  const location = useLocation()
  const isAuth = useOutletContext() as boolean
  const { id, isDashboard } = location.state as State
  const { data: singleQuestion, isLoading, error } = useQuerySingleQuestion(id)
  const { screenWidthMonitoring, screenWidth } = useScreen()
  useLayoutEffect(() => {
    window.addEventListener('resize', screenWidthMonitoring)
  }, [screenWidth])

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <>
      {singleQuestion && (
        <RootBase>
          <DetailTitle>{singleQuestion.title}</DetailTitle>
          <div className=' mb-8 flex w-11/12 flex-col lg:grid lg:w-full lg:grid-cols-12'>
            <div className=' col-span-8'>
              <DetailCard
                id={singleQuestion.id}
                title={singleQuestion.title}
                body={singleQuestion.body}
                post_username={singleQuestion.post_username}
                answer_list={singleQuestion.answer_list}
                tags={singleQuestion.tags}
                isDashboard={isDashboard}
              />
              <AnswerList answer_list={singleQuestion.answer_list} />
              {isAuth ? <AnswerReply question_id={singleQuestion.id} /> : <LogoutAnswerForm />}
            </div>
            {screenWidth >= 994 && <DetailProfileCard username={singleQuestion.post_username} />}
          </div>
        </RootBase>
      )}
    </>
  )
}
