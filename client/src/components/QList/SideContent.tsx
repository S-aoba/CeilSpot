import { AiOutlineExclamationCircle } from 'react-icons/ai'

export const SideContent = () => {
  return (
    <div className=' col-span-1 flex w-full justify-center py-10'>
      <div className=' h-fit w-10/12 rounded-3xl border-[3px] bg-white px-10 py-10'>
        <div className=' flex items-center gap-x-1'>
          <p>新着情報</p>
          <AiOutlineExclamationCircle color='blue' />
        </div>
        <hr className=' my-4 border-black' />
        <div className=' flex flex-col gap-y-5 pt-3 pb-5'>
          <p>CeilSpotに新しい機能が追加されました</p>
          <p>Recursionに新しいコースが追加されました</p>
        </div>
      </div>
    </div>
  )
}
