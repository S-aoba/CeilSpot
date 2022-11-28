import { QuestionCard } from './QuestionCard'
import { useQueryQuestions } from '../../../functional/UseQuery/useQueryQuestions'
import { RootBase } from '../../shared/layout/RootBase'
import { Error } from '../../shared/elements/Error/Error'
import { QuestionType } from '../../../types/types'
import { Loading } from '../../shared/elements/Loading/Loading'

export const QuestionItem = () => {
  const { data: dataQuestions, isLoading: isLoadingQuestions, error } = useQueryQuestions()

  if (error) return <Error />
  if (isLoadingQuestions) return <Loading />

  return (
    <RootBase id='questionItem'>
      <div className=' grid w-11/12 grid-cols-1 gap-y-5 xl:w-8/12'>
        {dataQuestions &&
          dataQuestions.map((question: QuestionType) => (
            <QuestionCard
              path={`/${question.post_username}/question/${question.id}`}
              key={question.id}
              id={question.id}
              title={question.title}
              body={question.body}
              post_username={question.post_username}
              answer_list={question.answer_list}
              tags={question.tags}
              isDashboard={false}
            />
          ))}
      </div>
    </RootBase>
  )
}
