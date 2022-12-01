import { ReactNode } from 'react'

type BaseProps = {
  id: 'questionItem' | 'questionDetail' | 'questionAsk' | 'dashboard'
  children: ReactNode
}

export const RootBase: React.FC<BaseProps> = ({ id, children }) => {
  return (
    <div  className=' flex h-fit min-h-screen animate-fade-in-fwd flex-col items-center pb-5 pt-20 lg:container lg:mx-auto '>
      {children}
    </div>
  )
}
