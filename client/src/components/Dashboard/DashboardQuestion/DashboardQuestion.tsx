import { useOutletContext } from 'react-router-dom'
import { useQueryUserQuestion } from '../../../Functional/UseQuery/useQueryUserQuestion'
import { UserInfo } from '../../../types/types'
import { Error } from '../../Error/Error'
import { Base } from '../../shared/layout/Base'
import { QuestionCard } from '../../Users/QuestionItem/QuestionCard'

export const DashboardQuestion = () => {
  const { username } = useOutletContext<UserInfo>()
  const { data: dataUserQuestions, isLoading: isUserQuestionsLoading, error } = useQueryUserQuestion(username)
  if (error) return <Error />
  if (isUserQuestionsLoading) return

  return (
    <Base id='userQuestions'>
      <div className='grid w-11/12 grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-10 xl:w-10/12'>
        {dataUserQuestions &&
          dataUserQuestions?.map((question) => (
            <QuestionCard
              path={`/question/${question.post_username}/${question.id}`}
              key={question.id}
              id={question.id}
              title={question.title}
              body={question.body}
              post_username={question.post_username}
              answer_list={question.answer_list}
              tags={question.tags}
            />
          ))}
      </div>
    </Base>
  )
}
