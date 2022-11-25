import { ReactNode, ComponentPropsWithoutRef } from 'react'
import { Button } from '../../shared/elements/Button'
import { useProcessAuth } from '../../../functional/hooks/useProcessAuth'

type Props = {
  children: ReactNode
} & ComponentPropsWithoutRef<'label'>

export const Login: React.FC<Props> = ({ children, ...props }) => {
  const {
    userName,
    setUserName,
    pw,
    setPw,
    email,
    setEmail,
    setIsLogin,
    registerMutation,
    loginMutation,
    processAuth,
  } = useProcessAuth()
  if (registerMutation.isLoading || loginMutation.isLoading) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <button className='loading btn-info btn'></button>
      </div>
    )
  }
  return (
    <>
      <label htmlFor='login-modal' {...props} onClick={() => setIsLogin(true)}>
        {children}
      </label>
      <input type='checkbox' id='login-modal' className='modal-toggle' />
      <label htmlFor='login-modal' className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <div className=' grid h-80 grid-rows-6'>
            <div className=' row-span-1 flex items-center'>
              <p className=' mb-3 text-2xl font-bold'>Login</p>
            </div>
            <form onSubmit={processAuth}>
              <div className=' row-span-5 flex flex-col gap-6'>
                <input
                  type='text'
                  className=' rounded-xl border border-gray-300 py-2 px-2 outline-sky-400'
                  placeholder='userName'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type='email'
                  className=' rounded-xl border border-gray-300 py-2 px-2 outline-sky-400'
                  placeholder='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type='password'
                  className=' rounded-xl border border-gray-300 py-2 px-2 outline-sky-400'
                  placeholder='password'
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
                <div>
                  <Button
                    disabled={!userName || !email || !pw}
                    type='submit'
                    className=' btn-info btn text-white hover:opacity-75'>
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </label>
      </label>
    </>
  )
}
