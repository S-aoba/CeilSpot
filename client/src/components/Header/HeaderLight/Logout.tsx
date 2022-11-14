import { ReactNode, ComponentPropsWithoutRef } from 'react'
import { Button } from '../../shared/elements/Button'
import { useProcessAuth } from '../../shared/hooks/useProcessAuth'

type Props = {
  children: ReactNode
} & ComponentPropsWithoutRef<'label'>

export const Logout: React.FC<Props> = ({ children, ...props }) => {
  const { logout } = useProcessAuth()

  return (
    <>
      <label htmlFor='logout-modal' {...props}>
        {children}
      </label>
      <input type='checkbox' id='logout-modal' className='modal-toggle' />
      <label htmlFor='logout-modal' className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <div className=' grid h-44 grid-rows-6'>
            <div className=' row-span-1 flex items-center'>
              <p className=' mb-3 text-2xl font-bold'>Logout</p>
            </div>
            <div className=' row-span-5 flex flex-col items-center justify-center gap-6 pt-5'>
              <div className=' flex justify-center font-mono text-xl'>
                <p>ログアウトしてもよろしいですか？</p>
              </div>
              <div className=' flex w-7/12 justify-around'>
                <Button onClick={logout} className=' btn-warning btn w-20 text-white hover:opacity-75'>
                  はい
                </Button>
                <label htmlFor='logout-modal' className=' btn w-20 text-white hover:opacity-75'>
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
