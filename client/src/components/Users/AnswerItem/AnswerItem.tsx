import { Title } from '../../shared/elements/Title'
import { AnswerCard } from './AnswerCard'

type Props = {
  answer_id: string
}

export const AnswerItem: React.FC<Props> = ({ answer_id }) => {
  return (
    <div className='flex h-fit w-11/12 flex-col items-center justify-center py-5 leading-loose'>
      <Title className=' w-8/12 py-3 text-3xl font-bold'>Answer List</Title>
      <AnswerCard answer_id={answer_id} />
    </div>
  )
}
