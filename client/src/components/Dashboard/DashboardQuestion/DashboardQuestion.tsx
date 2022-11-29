import { useOutletContext } from 'react-router-dom'
import { useQueryUserQuestion } from '../../../functional/UseQuery/useQueryUserQuestion'
import { UserInfo } from '../../../types/types'
import { Error } from '../../shared/elements/Error/Error'
import { Loading } from '../../shared/elements/Loading/Loading'
import { QuestionCard } from '../../Users/QuestionItem/QuestionCard'

export const DashboardQuestion = () => {
  const { username } = useOutletContext<UserInfo>()
  const { data: dataUserQuestions, isLoading: isUserQuestionsLoading, error } = useQueryUserQuestion(username)

  if (error) return <Error />
  if (isUserQuestionsLoading) return <Loading />

  return (
    <div id='userQuestions' className=' col-span-9 animate-fade-in-fwd'>
      <div className='grid w-11/12 grid-cols-1 gap-y-5 xl:w-8/12'>
        {dataUserQuestions?.length! >= 1 ? (
          dataUserQuestions?.map((question) => (
            <QuestionCard
              path={`/${question.post_username}/question/${question.id}`}
              key={question.id}
              id={question.id}
              title={question.title}
              body={question.body}
              post_username={question.post_username}
              answer_list={question.answer_list}
              tags={question.tags}
              isDashboard
            />
          ))
        ) : (
          <p>まだ質問はありません</p>
        )}
      </div>
    </div>
  )
}
