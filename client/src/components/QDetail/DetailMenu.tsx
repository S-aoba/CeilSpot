import { HiOutlineMenu } from 'react-icons/hi'
import { QuestionType } from '../../types/types'
import { DetailDeleteBtn } from './DetailDeleteBtn'
import { DetailEditBtn } from './DetailEditBtn'
import { DetailTags } from './DetailTags'

export const DetailMenu = ({ id, title, body, post_username, answer_list, tags }: QuestionType) => {
  return (
    <div className=' flex w-11/12 items-center justify-between'>
      <DetailTags tags={tags} />
      <div className='dropdown-end dropdown'>
        <label tabIndex={0}>
          <HiOutlineMenu className=' h-10 w-6 hover:cursor-pointer' />
        </label>
        <ul tabIndex={0} className='dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow'>
          <li>
            <DetailEditBtn
              id={id}
              title={title}
              body={body}
              post_username={post_username}
              answer_list={answer_list}
              tags={tags}
            />
          </li>
          <li>
            <DetailDeleteBtn questionId={id} />
          </li>
        </ul>
      </div>
    </div>
  )
}
