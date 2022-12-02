import { AiOutlineUser } from 'react-icons/ai'
import { SlCalender } from 'react-icons/sl'
import defaultUserIcon from '../../assets/defaultUserIcon.png'

type DetailProfileCardProps = {
  username: string
}

export const DetailProfileCard: React.FC<DetailProfileCardProps> = ({ username }) => {
  return (
    <div className='flex justify-center xl:col-span-3'>
      <div className='  h-fit max-h-fit w-10/12 rounded-2xl bg-white'>
        <div className=' flex w-full items-center justify-center py-5'>
          <div className=' flex w-9/12 items-center justify-between'>
            <AiOutlineUser className=' h-8 w-7 text-gray-400' />
            <span>質問者: </span>
            <div className=' flex items-center'>
              <img src={defaultUserIcon} alt='userIcon' className=' mr-2 h-8 w-8 rounded-full' />
              <p>{username}</p>
            </div>
          </div>
        </div>
        <div className=' flex w-full justify-center'>
          <hr className=' m-1 w-10/12 border-gray-300' />
        </div>
        <div className=' flex w-full items-center justify-center py-5'>
          <div className=' flex w-9/12 items-center justify-between'>
            <SlCalender className=' h-8 w-7 text-gray-400' />
            <span>公開日: </span>
            <div className=' flex items-center'>
              <p className=' tracking-wide'>2022/12/22</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
