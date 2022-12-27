import { ReactNode, ComponentPropsWithoutRef } from 'react'
import { Button } from '../../shared/elements/Button'
import { useProcessAuth } from '../../hooks/UserProcess/useProcessAuth'

type Props = {
  children: ReactNode
} & ComponentPropsWithoutRef<'label'>

export const SignUp: React.FC<Props> = ({ children, ...props }) => {
  const {
    userName,
    setUserName,
    pw,
    setPw,
    email,
    setEmail,
    isLogin,
    setIsLogin,
    registerMutation,
    loginMutation,
    processAuth,
  } = useProcessAuth()

  return (
    <>
      <label htmlFor='signUp-modal' {...props} onClick={() => setIsLogin(false)}>
        {children}
      </label>
      <input type='checkbox' id='signUp-modal' className='modal-toggle' />
      <label htmlFor='signUp-modal' className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <div className=' grid h-96 grid-rows-6'>
            <div className=' row-span-2'>
              <p className=' mb-3 text-2xl font-bold'>SignUp</p>
              <p>
                アカウントを作成することにより、利用規約　および　プライバシーポリシーに同意したものとみなされます。
              </p>
            </div>
            <form onSubmit={processAuth}>
              <div className=' row-span-4 flex flex-col gap-6'>
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
                    className=' btn-primary btn text-white hover:opacity-75'
                  >
                    SignUP
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
