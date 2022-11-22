import { QuestionForm } from './QuestionForm'
import { Title } from '../../shared/elements/Title'

export const QuestionAsk = () => {
  return (
    <div id='post' className=' flex h-fit max-h-screen flex-col items-center pt-3 lg:container lg:mx-auto'>
      <Title>Question Form</Title>
      <QuestionForm />
    </div>
  )
}
