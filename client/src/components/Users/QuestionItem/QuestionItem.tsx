import { QuestionCard } from './QuestionCard'
import { Title } from '../../shared/elements/Title'
import { useQueryQuestions } from '../../shared/hooks/UseQuery/useQueryQuestions'

export const QuestionItem = () => {
  const { data: dataQuestions, isLoading: isLoadingQuestions, error } = useQueryQuestions()
  return (
    <div
      id='questionItemList'
      className=' flex h-fit min-h-screen flex-col items-center justify-start gap-5 pt-5 pb-10 lg:container lg:mx-auto'>
      <Title className=' w-11/12 py-3 text-3xl font-bold xl:w-10/12'>Users Question</Title>
      <div className=' grid w-11/12 grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-10 xl:w-10/12'>
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
    </div>
  )
}
