import { QuestionForm } from './QuestionForm'
import { Title } from '../../shared/elements/Title'

export const QuestionAsk = () => {
  return (
    <div id='post' className=' md:container md:mx-auto flex h-fit max-h-screen flex-col items-center pt-20'>
      <Title className=' w-11/12 py-3 text-3xl font-bold xl:w-8/12'>Question Form</Title>
      <QuestionForm />
    </div>
  )
}
