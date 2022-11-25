import DefaultUserIcon from '../../../assets/defaultUserIcon.png'
import { Link } from 'react-router-dom'
import { QuestionType } from '../../../types/types'
import { useSelectQuestionIcon } from '../../../functional/hooks/useSelectQuestionIcon'

type LinkPathProps = {
  path: string
  isDashboard: boolean
} & QuestionType

export const QuestionCard: React.FC<LinkPathProps & QuestionType> = ({
  path,
  id,
  title,
  body,
  post_username,
  answer_list,
  tags,
  isDashboard,
}) => {
  const { selectQuestionIcon } = useSelectQuestionIcon()

  return (
    <div className=' col-span-1 grid h-fit grid-cols-12 rounded-xl py-3 md:w-10/12 lg:w-full'>
      <div className=' col-span-3 flex w-full items-center justify-center rounded-xl bg-white'>
        <img src={selectQuestionIcon(tags[0])} alt='languageIcon' className=' h-16 w-16' />
      </div>
      <div className=' col-span-9 grid grid-rows-6 px-3'>
        <div className=' row-span-4 flex items-center'>
          <Link to={path} relative='path' className=' hover:text-sky-400' state={{ id, isDashboard }}>
            <p className=' text-lg font-semibold line-clamp-2 lg:line-clamp-3'>{title}</p>
          </Link>
        </div>
        <div className='row-span-2 flex items-center gap-3'>
          <img src={DefaultUserIcon} alt='userIcon' className=' h-10 w-10 rounded-full' />
          <div className=' w-40'>
            <p className=' truncate text-sm'>{post_username}</p>
          </div>
          <p className=' text-sm text-gray-400'>29日前</p>
        </div>
      </div>
    </div>
  )
}
