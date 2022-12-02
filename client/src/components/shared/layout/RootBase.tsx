import { ReactNode } from 'react'

type BaseProps = {
  children: ReactNode
}

export const RootBase: React.FC<BaseProps> = ({ children }) => {
  return (
    <div className=' flex h-fit min-h-screen animate-fade-in-fwd flex-col items-center bg-green-400 pb-5 pt-20 lg:container lg:mx-auto'>
      {children}
    </div>
  )
}
