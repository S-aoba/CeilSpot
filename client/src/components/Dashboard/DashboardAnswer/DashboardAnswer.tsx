import { useOutletContext } from 'react-router-dom'
import { useQueryUserAnswer } from '../../../Functional/UseQuery/useQueryUserAnswer'
import { UserInfo } from '../../../types/types'
import { Error } from '../../Error/Error'
import { Base } from '../../shared/layout/Base'
import { DashBoardAnswerCard } from './DashBoardAnswerCard'

export const DashboardAnswer = () => {
  const { username } = useOutletContext<UserInfo>()
  const { data: dataUserAnswers, isLoading: isUserAnswerLoading, error } = useQueryUserAnswer(username)
  if (error) return <Error />
  if (isUserAnswerLoading) return
  return (
    <Base id='userAnswer'>
      <div className='grid w-11/12 grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-10 xl:w-10/12'>
        {dataUserAnswers &&
          dataUserAnswers?.map((answer) => (
            <DashBoardAnswerCard
              key={answer.id}
              path={'/'}
              id={answer.id}
              body={answer.body}
              question_id={answer.question_id}
              respondent_username={answer.respondent_username}
            />
          ))}
      </div>
    </Base>
  )
}
