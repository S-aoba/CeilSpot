import { ReactNode } from 'react'

type BaseProps = {
  id: string
  children: ReactNode
}

export const Base: React.FC<BaseProps> = ({ id, children }) => {
  return (
    <div
      id='questionItemList'
      className=' flex h-fit min-h-screen flex-col items-center justify-start gap-5 pt-5 pb-10 lg:container lg:mx-auto animate-fade-in-fwd'>
      {children}
    </div>
  )
}
