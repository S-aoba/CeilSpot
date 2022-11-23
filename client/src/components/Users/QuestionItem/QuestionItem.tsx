import { QuestionCard } from './QuestionCard'
import { useQueryQuestions } from '../../../Functional/UseQuery/useQueryQuestions'
import { Base } from '../../shared/layout/Base'

export const QuestionItem = () => {
  const { data: dataQuestions, isLoading: isLoadingQuestions, error } = useQueryQuestions()

  return (
    <Base id='questionItemList'>
      <div className=' grid w-11/12 grid-cols-1 gap-y-8 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-8 xl:w-10/12'>
        {isLoadingQuestions ? (
          <p>Loading...</p>
        ) : (
          dataQuestions?.map((question) => (
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
          ))
        )}
      </div>
    </Base>
  )
}
