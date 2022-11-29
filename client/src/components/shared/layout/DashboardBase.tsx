import { ReactNode } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectMenubarTab } from '../../../slices/appSlice'

type DashboardBaseProps = {
  children: ReactNode
}
export const DashboardBase: React.FC<DashboardBaseProps> = ({ children }) => {
  const selectedTab = useAppSelector(selectMenubarTab)

  const displayDashboardBase = () => {
    if (selectedTab === 'profile') {
      return (
        <div className='h-full max-h-screen'>
          <div className=' grid h-full max-h-screen animate-fade-in-fwd grid-cols-12 pb-5 lg:container lg:mx-auto'>
            {children}
          </div>
        </div>
      )
    }
    return (
      <div className='h-fit min-h-screen'>
        <div className=' grid h-fit min-h-screen animate-fade-in-fwd grid-cols-12 pb-5 lg:container lg:mx-auto'>
          {children}
        </div>
      </div>
    )
  }
  return <>{displayDashboardBase()}</>
}
