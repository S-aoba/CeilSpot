import { ReactNode } from 'react'

type BaseProps = {
  id: 'questionItem' | 'questionDetail' | 'questionAsk' | 'dashboard'
  children: ReactNode
}

export const RootBase: React.FC<BaseProps> = ({ id, children }) => {
  return (
    <div id={`${id}`} className='h-fit max-h-fit'>
      <div className=' flex h-fit max-h-fit animate-fade-in-fwd flex-col items-center pb-5 lg:container lg:mx-auto '>
        {children}
      </div>
    </div>
  )
}
