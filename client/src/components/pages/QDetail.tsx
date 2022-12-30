import { useLocation, useOutletContext } from 'react-router-dom'
import { DetailCard } from '../QDetail/DetailCard'
import { RootBase } from '../shared/layout/RootBase'
import { DetailProfileCard } from '../QDetail/DetailProfileCard'
import { DetailTitle } from '../QDetail/DetailTitle'
import { QuestionType } from '../../types/types'
import { useQuerySingleQuestion } from '../../useQuery/useQuerySingleQuestion'
import { Error } from '../shared/elements/Error/Error'
import { Loading } from '../shared/elements/Loading/Loading'
import { LogoutAnswerForm } from '../QDetail/LogoutAnswerForm'
import { useScreen } from '../hooks/useScreen'
import { useLayoutEffect } from 'react'
import { AnswerReply } from '../AReply/AReply'
import { AnswerList } from '../AList/AList'

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
