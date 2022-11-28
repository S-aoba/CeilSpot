import { ReactNode } from 'react'

type BaseProps = {
  id: 'questionItem' | 'questionDetail' | 'questionAsk' | 'dashboard'
  children: ReactNode
}

export const RootBase: React.FC<BaseProps> = ({ id, children }) => {
  const displayHandler = () => {
    if (id === 'questionAsk' || id === 'dashboard') {
      return (
        <div id={`${id}`} className='h-full max-h-screen'>
          <div className=' flex h-full max-h-screen animate-fade-in-fwd flex-col items-center py-5 lg:container lg:mx-auto '>
            {children}
          </div>
        </div>
      )
    }
    return (
      <div id={`${id}`} className='h-fit min-h-screen'>
        <div className=' flex h-fit min-h-screen animate-fade-in-fwd flex-col items-center py-5 lg:container lg:mx-auto '>
          {children}
        </div>
      </div>
    )
  }
  return <>{displayHandler()}</>
}
