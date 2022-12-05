import { ReactNode } from 'react'

type DashboardBaseProps = {
  children: ReactNode
}
export const DashboardBase: React.FC<DashboardBaseProps> = ({ children }) => {
  return (
    <div className=' flex h-fit min-h-screen animate-fade-in-fwd flex-col items-center py-20 lg:container lg:mx-auto'>
      {children}
    </div>
  )
}
