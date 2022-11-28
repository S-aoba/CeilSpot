import { ReactNode } from 'react'

type DashboardBaseProps = {
  children: ReactNode
}

export const DashboardBase: React.FC<DashboardBaseProps> = ({ children }) => {
  return (
    <div className='h-full max-h-screen'>
      <div className=' grid h-full max-h-screen animate-fade-in-fwd grid-cols-12 py-5 lg:container lg:mx-auto'>
        {children}
      </div>
    </div>
  )
}
