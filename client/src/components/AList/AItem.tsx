import MDEditor from '@uiw/react-md-editor'
import { useQuerySingleAnswer } from '../../functional/UseQuery/useQuerySingleAnswer'
import defaultIcon from '../../assets/defaultUserIcon.png'
import { Loading } from '../shared/elements/Loading/Loading'
import { Error } from '../shared/elements/Error/Error'

type AnswerItemProps = {
  answer_id: string
}
export const AnswerItem: React.FC<AnswerItemProps> = ({ answer_id }) => {
  const { data: dataAnswer, isLoading: isSingleAnswerLoading, error } = useQuerySingleAnswer(answer_id)
  if (isSingleAnswerLoading) return <Loading />
  if (error) return <Error />

  return (
    <div className=' flex w-11/12 flex-col pb-8 lg:w-full'>
      <div className=' flex flex-col items-center justify-center rounded-2xl bg-white py-5 px-3'>
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