import { AiOutlineComment } from 'react-icons/ai'
import DefaultUserIcon from '../../assets/defaultUserIcon.png'

type QItemUserInfoProps = {
  post_username: string
  answer_list: string[]
}

export const QItemUserInfo: React.FC<QItemUserInfoProps> = ({ post_username, answer_list }) => {
  return (
    <div className=' row-span-2 flex items-center justify-start gap-4'>
      <img src={DefaultUserIcon} alt='userIcon' className=' h-8 w-8 rounded-full' />
      <p className=' truncate text-sm'>{post_username}</p>
      <p className=' text-sm text-gray-400'>29日前</p>
      {answer_list.length >= 1 && (
        <>
          <AiOutlineComment />
          <p className=' -ml-3 text-sm'>{answer_list.length}</p>
        </>
      )}
    </div>
  )
}
