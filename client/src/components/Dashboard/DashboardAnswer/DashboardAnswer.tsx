import { useLocation } from 'react-router-dom'
import { useQueryUserAnswer } from '../../../Functional/UseQuery/useQueryUserAnswer'
import { Base } from '../../shared/layout/Base'
import { DashBoardAnswerCard } from './DashBoardAnswerCard'

export const DashboardAnswer = () => {
  const location = useLocation()
  const username = location.state as string
  const { data: dataUserAnswers, isLoading: isLoadingUserAnswers } = useQueryUserAnswer(username)
  return (
    <Base id='userAnswer'>
      <div className='grid w-11/12 grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-10 xl:w-10/12'>
        {isLoadingUserAnswers ? (
          <p>Loading...</p>
        ) : (
          dataUserAnswers?.map((answer) => (
            <DashBoardAnswerCard
              key={answer.id}
              path={'/'}
              id={answer.id}
              body={answer.body}
              question_id={answer.question_id}
              respondent_username={answer.respondent_username}
            />
          ))
        )}
      </div>
    </Base>
  )
}
