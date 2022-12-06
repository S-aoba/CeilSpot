import { FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { setEditedQuestion, toggleEditMode } from '../../slices/appSlice'
import { QuestionType } from '../../types/types'

export const DetailEditBtn = ({ id, title, body, post_username, answer_list, tags }: QuestionType) => {
  const dispatch = useAppDispatch()

  return (
    <Link
      to={'/question/ask'}
      relative='path'
      className=' flex w-full justify-center hover:bg-sky-400 hover:text-white'
      onClick={() => {
        dispatch(
          setEditedQuestion({
            id,
            title,
            body,
            post_username,
            answer_list,
            tags,
          })
        )
        dispatch(toggleEditMode(true))
      }}
    >
      <FiEdit className=' h-5 w-5' />
      <p>編集する</p>
    </Link>
  )
}
