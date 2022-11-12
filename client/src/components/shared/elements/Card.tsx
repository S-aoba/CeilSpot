import LanguageIcon from '../../../assets/LanguageIcon/python.png'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'

export const Card: React.FC = () => {
  return (
    <div className=' col-span-1 grid h-32 w-[28rem] grid-cols-12 rounded-xl'>
      <div className=' col-span-4 flex items-center justify-center'>
        <img src={LanguageIcon} alt='languageIcon' className=' h-24 w-24 rounded-full' />
      </div>
      <div className=' col-span-8 grid grid-rows-6'>
        <div className=' row-span-4'>
          <p className=' text-lg font-semibold line-clamp-3'>
            新機能をリリースするまでのバックエンド・フロントエンドでの開発手順/PJ進行管理についてのまとめについての考察についてに
          </p>
        </div>
        <div className='row-span-2 flex items-center gap-3'>
          <img src={DefaultUserIcon} alt='userIcon' className=' h-10 w-10 rounded-full' />
          <div className=' w-40'>
            <p className=' truncate text-sm'>testUser</p>
          </div>
          <p className=' text-sm text-gray-400'>29日前</p>
        </div>
      </div>
    </div>
  )
}
