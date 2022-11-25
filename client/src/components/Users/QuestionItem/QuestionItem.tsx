import { QuestionCard } from './QuestionCard'
import { useQueryQuestions } from '../../../functional/UseQuery/useQueryQuestions'
import { Base } from '../../shared/layout/Base'
import { Error } from '../../Error/Error'
import { QuestionType } from '../../../types/types'
import { Loading } from '../../Loading/Loading'

export const QuestionItem = () => {
  const { data: dataQuestions, isLoading: isLoadingQuestions, error } = useQueryQuestions()
  if (error) return <Error />
  if (isLoadingQuestions) return <Loading />

  return (
    <Base id='questionItemList'>
      <div className=' grid w-11/12 grid-cols-1 gap-y-8 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-8 xl:w-10/12'>
        {dataQuestions &&
          dataQuestions.map((question: QuestionType) => (
            <QuestionCard
              path={`/question/${question.post_username}/${question.id}`}
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
    </Base>
  )
}
