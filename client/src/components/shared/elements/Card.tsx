import LanguageIcon from '../../../assets/LanguageIcon/python.png'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'

export const Card: React.FC = () => {
  const min = ''
  return (
    <div className=' col-span-1 grid h-28 w-full grid-cols-12 rounded-xl '>
      <div className=' col-span-3 flex w-full items-center justify-center rounded-xl bg-white'>
        <img src={LanguageIcon} alt='languageIcon' className=' h-16 w-16' />
      </div>
      <div className=' col-span-8 grid grid-rows-6 px-3'>
        <div className=' row-span-4 flex items-center'>
          <p className=' text-lg font-semibold line-clamp-2 lg:line-clamp-3'>
            【Flutter】プログラミング歴半年で、モバイルアプリを2個リリースした話
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
