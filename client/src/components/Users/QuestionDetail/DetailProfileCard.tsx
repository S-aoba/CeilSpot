import defaultUserIcon from '../../../assets/defaultUserIcon.png'
import { useSelectQuestionIcon } from '../../shared/hooks/useSelectQuestionIcon'

type DetailProfileCardProps = {
  tag: string
  username: string
}

export const DetailProfileCard: React.FC<DetailProfileCardProps> = ({ tag, username }) => {
  const { selectQuestionIcon } = useSelectQuestionIcon()

  return (
    <div className='xl:col-span-3 flex justify-center pl-5'>
      <div className='  flex h-96 w-80 flex-col gap-10 rounded-3xl bg-white px-5 pt-5 text-base'>
        <div className=' flex justify-center'>
          <img src={selectQuestionIcon(tag)} alt='languageIcon' className=' h-24 w-24 rounded-xl' />
        </div>
        <div className=' flex items-center justify-between'>
          <span>質問者: </span>
          <div className=' flex items-center'>
            <img src={defaultUserIcon} alt='userIcon' className=' mr-2 h-10 w-10 rounded-full' />
            <p>{username}</p>
          </div>
        </div>
        <hr className=' -mt-8' />
        <div className=' flex items-center justify-between'>
          <span>公開日: </span>
          <p className=' tracking-wide'>2022 / 11 / 22</p>
        </div>
        <hr className=' -mt-8' />
      </div>
    </div>
  )
}
