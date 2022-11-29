import { ReactNode } from 'react'

type DashboardBaseProps = {
  children: ReactNode
}
export const DashboardBase: React.FC<DashboardBaseProps> = ({ children }) => {
  return (
    <div className='h-fit min-h-fit'>
      <div className=' grid h-fit min-h-fit animate-fade-in-fwd grid-cols-12 pb-5 lg:container lg:mx-auto'>
        {children}
      </div>
    </div>
  )
}
