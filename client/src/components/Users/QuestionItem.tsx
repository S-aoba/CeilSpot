import { Card as QuestionCard } from '../shared/elements/Card'
import { Title } from '../shared/elements/Title'

export const QuestionItem = () => {
  return (
    <div
      id='itemList'
      className=' flex h-fit min-h-screen flex-col items-center justify-start gap-5 py-20 lg:container lg:mx-auto'>
      <Title className=' w-11/12 py-3 text-3xl font-bold xl:w-10/12'>Users Question</Title>
      <div className='grid w-11/12 grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-10 xl:w-10/12'>
        <QuestionCard path={'/question/:username/:question_id'} />
        <QuestionCard path={'/question/:username/:question_id'} />
        <QuestionCard path={'/question/:username/:question_id'} />
        <QuestionCard path={'/question/:username/:question_id'} />
        <QuestionCard path={'/question/:username/:question_id'} />
        <QuestionCard path={'/question/:username/:question_id'} />
        <QuestionCard path={'/question/:username/:question_id'} />
        <QuestionCard path={'/question/:username/:question_id'} />
      </div>
    </div>
  )
}
