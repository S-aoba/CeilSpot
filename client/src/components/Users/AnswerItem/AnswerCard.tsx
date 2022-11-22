import MDEditor from '@uiw/react-md-editor'
import { useQuerySingleAnswer } from '../../shared/hooks/UseQuery/useQuerySingleAnswer'
import defaultIcon from '../../../assets/defaultUserIcon.png'

type Props = {
  answer_id: string
}
export const AnswerCard: React.FC<Props> = ({ answer_id }) => {
  const { data: dataAnswer } = useQuerySingleAnswer(answer_id)

  return (
    <div className=' w-9/12 rounded-3xl'>
      <div className=' flex flex-col items-center justify-center rounded-2xl bg-white py-5 px-3 mb-5'>
        <div className='w-11/12'>
          <hr className=' my-6 border-gray-300' />
          <MDEditor.Markdown source={dataAnswer?.body} style={{ whiteSpace: 'pre-wrap' }} className=' tracking-wide' />
          <hr className=' mt-6 border-gray-300' />
        </div>
        <div className=' flex w-11/12 items-center justify-end pt-5'>
          <span>by: {dataAnswer?.respondent_username}</span>
          <img src={defaultIcon} alt='' className=' h-10 w-10' />
        </div>
      </div>
    </div>
  )
}
