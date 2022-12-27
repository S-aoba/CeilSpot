import { QuestionItem } from '../QList/QItem'
import { useQueryQuestions } from '../querys/useQueryQuestions'
import { RootBase } from '../shared/layout/RootBase'
import { Error } from '../shared/elements/Error/Error'
import { QuestionType } from '../../types/types'
import { Loading } from '../shared/elements/Loading/Loading'
import { SideContent } from '../QList/SideContent'
import { useLayoutEffect } from 'react'
import { useScreen } from '../hooks/useScreen'

export const QuestionList = () => {
  const { data: dataQuestions, isLoading: isLoadingQuestions, error } = useQueryQuestions()
  const { screenWidthMonitoring, screenWidth } = useScreen()

  useLayoutEffect(() => {
    window.addEventListener('resize', screenWidthMonitoring)
  }, [screenWidth])

  if (error) return <Error />
  if (isLoadingQuestions) return <Loading />

  return (
    <RootBase>
      <div className=' flex flex-col items-center md:grid md:grid-cols-3 md:items-start'>
        <main className=' grid w-11/12 grid-cols-1 gap-5 px-5 py-10 md:col-span-2 md:w-full md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
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
        </main>
        <SideContent />
      </div>
    </RootBase>
  )
}
