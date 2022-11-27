import { QuestionForm } from './QuestionForm'

export const QuestionAsk = () => {
  return (
    <div
      id='ask'
      className=' flex h-fit max-h-screen animate-fade-in-fwd flex-col items-center pt-3 lg:container lg:mx-auto'>
      <QuestionForm />
    </div>
  )
}
