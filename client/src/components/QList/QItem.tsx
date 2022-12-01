import DefaultUserIcon from '../../assets/defaultUserIcon.png'
import { Link } from 'react-router-dom'
import { QuestionType } from '../../types/types'
import { useSelectQuestionIcon } from '../../functional/hooks/useSelectQuestionIcon'

type LinkPathProps = {
  path: string
  isDashboard: boolean
} & QuestionType

export const QuestionItem: React.FC<LinkPathProps & QuestionType> = ({
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
    <div className=' col-span-1 flex h-24 w-11/12 rounded-3xl border-[3px] bg-white hover:animate-shadow-pop-bl'>
      <div className=' flex w-32 items-center justify-center py-2 px-2'>
        <img src={selectQuestionIcon(tags[0])} alt='languageIcon' className=' h-16 w-16 rounded-lg' />
      </div>
      <div className=' grid w-full grid-rows-6 py-2 px-2'>
        <div className=' row-span-4 flex items-center'>
          <Link
            to={path}
            relative='path'
            className=' hover:text-sky-400'
            state={{ id, title, body, post_username, answer_list, tags, isDashboard }}>
            <p className=' text-sm font-semibold line-clamp-2 lg:line-clamp-2'>{title}</p>
          </Link>
        </div>
        <div className=' row-span-2 flex items-center justify-start gap-4'>
          <img src={DefaultUserIcon} alt='userIcon' className=' h-8 w-8 rounded-full' />
          <p className=' truncate text-sm'>{post_username}</p>
          <p className=' text-sm text-gray-400'>29日前</p>
        </div>
      </div>
    </div>
  )
}
