import { useNavigate } from 'react-router-dom'
import { QuestionType } from '../../types/types'
import { QItemLanguageIcon } from './QItemLanguageIcon'
import { QItemTitle } from './QItemTitle'
import { QItemUserInfo } from './QItemUserInfo'

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
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        navigate(`${path}`, {
          state: {
            id,
            title,
            body,
            post_username,
            answer_list,
            tags,
            isDashboard,
          },
        })
      }}
      className=' flex h-24 w-[26rem] rounded-3xl border-[3px] bg-white duration-500 hover:relative hover:translate-x-2 hover:-translate-y-2 hover:cursor-pointer hover:shadow-[-8px_8px_0px_0px_#171717] lg:w-[29rem]'
    >
      <QItemLanguageIcon firstTag={tags[0]} />
      <div className=' grid w-full grid-rows-6 py-2 px-2'>
        <QItemTitle title={title} />
        <QItemUserInfo post_username={post_username} answer_list={answer_list} />
      </div>
    </div>
  )
}
