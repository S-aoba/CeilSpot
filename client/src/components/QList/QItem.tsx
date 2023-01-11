import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/app/hooks'
import { changeMenubarTab, selectMenubarTab } from '../../store/slices/menuBarSlice'
import { QuestionType } from '../../types'
import { QItemLanguageIcon } from './QItemLanguageIcon'
import { QItemTitle } from './QItemTitle'
import { QItemUserInfo } from './QItemUserInfo'

type QuestionItemProps = {
  path: string
  isDashboard: boolean
} & QuestionType

export const QuestionItem: React.FC<QuestionItemProps & QuestionType> = ({
  path,
  isDashboard,
  id,
  title,
  body,
  post_username,
  answer_list,
  tags,
}) => {
  const dispatch = useDispatch()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)
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
        dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'default' }))
      }}
      className=' col-span-1 flex h-[13.5rem] w-full flex-col rounded-3xl border-[3px] bg-white py-5 duration-500 hover:relative hover:translate-x-2 hover:-translate-y-2 hover:cursor-pointer hover:shadow-[-8px_8px_0px_0px_#171717] hover:brightness-95'
    >
      <div className=' flex px-2'>
        <QItemLanguageIcon firstTag={tags[0]} />
        <QItemUserInfo post_username={post_username} answer_list={answer_list} />
      </div>
      <QItemTitle title={title} />
    </div>
  )
}
