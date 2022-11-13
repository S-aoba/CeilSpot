import { Card as QuestionCard } from '../shared/elements/Card'

export const QuestionItem = () => {
  return (
    <div
      id='itemList'
      className=' flex h-fit min-h-screen flex-col items-center justify-start gap-5 py-20 lg:container lg:mx-auto'>
      <div className=' w-11/12 py-3 text-3xl font-bold xl:w-10/12'>
        <p>All User Questions</p>
      </div>
      <div className='grid w-11/12 grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-10 xl:w-10/12'>
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
      </div>
    </div>
  )
}
