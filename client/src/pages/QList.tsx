import { QuestionItem } from '../components/QList/QItem'
import { useQueryQuestions } from '../functional/UseQuery/useQueryQuestions'
import { RootBase } from '../components/shared/layout/RootBase'
import { Error } from '../components/shared/elements/Error/Error'
import { QuestionType } from '../types/types'
import { Loading } from '../components/shared/elements/Loading/Loading'

export const QuestionList = () => {
  const { data: dataQuestions, isLoading: isLoadingQuestions, error } = useQueryQuestions()

  if (error) return <Error />
  if (isLoadingQuestions) return <Loading />

  return (
    <RootBase id='questionItem'>
      <div className=' grid w-9/12 grid-cols-1 gap-y-5 xl:w-10/12 xl:grid-cols-2 xl:gap-x-5'>
        {dataQuestions &&
          dataQuestions.map((question: QuestionType) => (
            <QuestionItem
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
