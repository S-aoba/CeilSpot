import { Link } from 'react-router-dom'
import { QuestionType } from '../../types/types'

type QItemTitleProps = {
  path: string
  isDashboard: boolean
} & QuestionType

export const QItemTitle: React.FC<QItemTitleProps> = ({
  path,
  id,
  title,
  body,
  post_username,
  answer_list,
  tags,
  isDashboard,
}) => {
  return (
    <div className=' row-span-4 flex items-center'>
      <Link
        to={path}
        relative='path'
        className=' hover:text-sky-400'
        state={{ id, title, body, post_username, answer_list, tags, isDashboard }}
      >
        <p className=' text-lg font-semibold line-clamp-2 lg:line-clamp-2'>{title}</p>
      </Link>
    </div>
  )
}
