import { ReactNode } from 'react'
type Props = {
  className?: string
  modalTitle: string
  modalDescription?: string
  children: ReactNode
  modalName: 'login' | 'signUp' | 'logout' | 'delete' | 'rename'
  onClick: () => void
}
export const ModalBtn: React.FC<Props> = ({
  className,
  modalTitle,
  modalDescription,
  children,
  modalName,
  onClick,
}) => {
  return (
    <>
      <label htmlFor={`${modalName}`} className={className}>
        {children}
      </label>
      <input type='checkbox' id={`${modalName}`} className='modal-toggle' />
      <label htmlFor={`${modalName}`} className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <div className=' h-96'>
            <div className=' flex flex-col items-center gap-14 pt-5'>
              <div className=' flex flex-col justify-center gap-5'>
                <p className=' text-3xl'>{modalTitle}</p>
                <p>{modalDescription}</p>
              </div>
              <div className=' flex w-7/12 justify-around'>
                <label
                  htmlFor={`${modalName}`}
                  onClick={onClick}
                  className=' btn-warning btn w-20 text-white hover:opacity-75'>
                  はい
                </label>
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
