import { MdDeleteOutline } from 'react-icons/md'
import { Button } from './Button'
type Props = {
  onClick: () => void
}
export const DeleteBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <label htmlFor='delete-modal'>
        <MdDeleteOutline className=' h-10 w-10 text-sky-400 hover:cursor-pointer hover:opacity-75' />
      </label>
      <input type='checkbox' id='delete-modal' className='modal-toggle' />
      <label htmlFor='delete-modal' className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <div className=' grid h-44 grid-rows-6'>
            <div className=' row-span-1 flex items-center'>
              <p className=' mb-3 text-2xl font-bold'>Logout</p>
            </div>
            <div className=' row-span-5 flex flex-col items-center justify-center gap-6 pt-5'>
              <div className=' flex justify-center font-mono text-xl'>
                <p>本当に削除してもよろしいですか？</p>
              </div>
              <div className=' flex w-7/12 justify-around'>
                <Button onClick={onClick} className=' btn-warning btn w-20 text-white hover:opacity-75'>
                  はい
                </Button>
                <label htmlFor='delete-modal' className=' btn w-20 text-white hover:opacity-75'>
                  いいえ
                </label>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}

{
}
