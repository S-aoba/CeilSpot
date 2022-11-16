import { ReactNode } from 'react'
import { Button } from './Button'
type Props = {
  className?: string
  modalTitle: string
  children: ReactNode
  modalName: 'login' | 'signUp' | 'logout' | 'delete'
  onClick: () => void
}
export const ModalBtn: React.FC<Props> = ({ className, modalTitle, children, modalName, onClick }) => {
  return (
    <>
      <label htmlFor={`${modalName}`} className={className}>
        {children}
      </label>
      <input type='checkbox' id={`${modalName}`} className='modal-toggle' />
      <label htmlFor={`${modalName}`} className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <div className=' grid h-44 grid-rows-6'>
            <div className=' row-span-1 flex items-center'>
              <p className=' mb-3 text-2xl font-bold'>Logout</p>
            </div>
            <div className=' row-span-5 flex flex-col items-center justify-center gap-6 pt-5'>
              <div className=' flex justify-center font-mono text-xl'>
                <p>{modalTitle}</p>
              </div>
              <div className=' flex w-7/12 justify-around'>
                <Button onClick={onClick} className=' btn-warning btn w-20 text-white hover:opacity-75'>
                  はい
                </Button>
                <label htmlFor={`${modalName}`} className=' btn w-20 text-white hover:opacity-75'>
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
