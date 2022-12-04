import { ReactNode } from 'react'

type BaseProps = {
  children: ReactNode
}

export const RootBase: React.FC<BaseProps> = ({ children }) => {
  return (
    <div className=' flex h-fit min-h-fit animate-fade-in-fwd flex-col items-center py-20 lg:container lg:mx-auto'>
      {children}
    </div>
  )
}
