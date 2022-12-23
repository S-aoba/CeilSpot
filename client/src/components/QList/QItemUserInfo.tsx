import { AiOutlineComment } from 'react-icons/ai'
import DefaultUserIcon from '../../assets/defaultUserIcon.png'

type QItemUserInfoProps = {
  post_username: string
  answer_list: string[]
}

export const QItemUserInfo: React.FC<QItemUserInfoProps> = ({ post_username, answer_list }) => {
  return (
    <div className=' flex w-full flex-col items-center justify-center gap-y-2'>
      <div className=' flex w-full gap-x-3 pl-3 items-center'>
        <img src={DefaultUserIcon} alt='userIcon' className=' h-6 w-6 rounded-full' />
        <p className=' truncate text-sm'>{post_username}</p>
      </div>
      <div className=' flex w-full gap-x-3 pl-3'>
        <p className=' text-sm text-gray-400'>投稿日: 29日前</p>
        <div className=' flex gap-x-2 items-center'>
          <AiOutlineComment />
          <p className=' text-sm'>{answer_list.length}</p>
        </div>
      </div>
    </div>
  )
}
