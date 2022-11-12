import { Card as QuestionCard } from '../shared/elements/Card'

export const QuestionItem = () => {
  return (
    <div id='itemList' className=' flex h-fit min-h-screen items-start justify-center py-20 md:container md:mx-auto'>
      <div className='  grid w-full grid-cols-1 gap-y-10 py-3 md:grid md:w-8/12 md:grid-cols-2 md:gap-y-10  md:gap-x-10'>
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
