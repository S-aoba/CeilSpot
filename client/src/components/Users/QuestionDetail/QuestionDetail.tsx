import MDEditor from '@uiw/react-md-editor'
import LanguageIcon from '../../../assets/LanguageIcon/python.png'
import { Title } from '../../shared/elements/Title'
import defaultUserIcon from '../../../assets/defaultUserIcon.png'
import { useLocation } from 'react-router-dom'
import { useQuerySingleQuestion } from '../../shared/hooks/UseQuery/useQuerySingleQuestion'

type State = {
  id: string
}
export const QuestionDetail = () => {
  const location = useLocation()
  const { id } = location.state as State
  const { data: dataQuestion } = useQuerySingleQuestion(id)
  return (
    <div id='detail' className=' md:container md:mx-auto flex h-fit min-h-screen flex-col items-center py-20'>
      <Title className=' w-11/12 py-3 text-3xl font-bold xl:w-8/12'>Question Detail</Title>
      <div className=' flex h-fit w-11/12 flex-col items-center justify-center gap-8 py-5'>
        <div>
          <img src={LanguageIcon} alt='languageIcon' className=' h-24 w-24 rounded-full' />
        </div>
        <div className=' flex w-9/12 flex-col gap-3 py-5 text-center lg:w-full'>
          <p className=' text-2xl font-semibold'>{dataQuestion?.title}</p>
          <div className=' flex items-center justify-center gap-3'>
            <p className=' text-sm text-gray-400'>公開日: 2022/11/12</p>
            <div className=' flex items-center justify-center gap-2 text-sm text-gray-400'>
              作成者:
              <p>{dataQuestion?.post_username}</p>
              <img src={defaultUserIcon} alt='defaultUserIcon' className=' h-8 w-8 rounded-full' />
            </div>
          </div>
        </div>
      </div>
      <div className=' flex w-8/12 flex-col items-center justify-center rounded-xl bg-white pb-10'>
        <div className=' flex w-11/12 flex-wrap items-center justify-start gap-4 py-5'>
          <p className=' font-bold'>タグ : </p>
          {dataQuestion?.tags.map((tag) => (
            <div className=' rounded-3xl border border-sky-400 py-1 px-3 text-sky-400'>
              <p>{tag}</p>
            </div>
          ))}
        </div>
        <div className=' w-11/12'>
          <hr className='mb-6 border-gray-300' />
          <div>
            <MDEditor.Markdown source={dataQuestion?.body} style={{ whiteSpace: 'pre-wrap' }} />
          </div>
          <hr className=' my-6 border-gray-300' />
        </div>
      </div>
    </div>
  )
}
