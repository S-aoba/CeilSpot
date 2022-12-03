import { AiOutlineUser } from 'react-icons/ai'
import { SlCalender } from 'react-icons/sl'
import defaultUserIcon from '../../assets/defaultUserIcon.png'

type DetailProfileCardProps = {
  username: string
}

export const DetailProfileCard: React.FC<DetailProfileCardProps> = ({ username }) => {
  return (
    <div className='flex justify-center  lg:col-span-4'>
      <div className=' my-8 h-fit max-h-fit w-11/12 rounded-2xl bg-white'>
        <div className=' flex w-full items-center justify-center py-5'>
          <div className=' flex w-9/12 items-center justify-between'>
            <div className='flex items-center gap-2'>
              <AiOutlineUser className=' h-5 w-5 text-gray-400' />
              <span className=' text-sm'>質問者 : </span>
            </div>
            <div className=' flex h-fit max-h-fit w-32 items-center justify-end'>
              <img src={defaultUserIcon} alt='userIcon' className=' mr-2 h-8 w-8 rounded-full' />
              <p className=' break-words text-sm line-clamp-1'>{username}</p>
            </div>
          </div>
        </div>
        <div className=' flex w-full justify-center'>
          <hr className=' m-1 w-10/12 border-gray-300' />
        </div>
        <div className=' flex w-full items-center justify-center py-5'>
          <div className=' flex w-9/12 items-center justify-between'>
            <div className='flex items-center gap-2'>
              <SlCalender className=' h-5 w-5 text-gray-400' />
              <span className=' text-sm'>質問日 : </span>
            </div>
            <div className=' flex items-center'>
              <p className=' text-sm tracking-wide'>2022/12/22</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
