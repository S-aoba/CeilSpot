import { ReactNode } from 'react'
import { DashboardMenu } from '../../MyPage/DMenu/DMenu'

type MyPageBaseProps = {
  children: ReactNode
  userId: string
}
export const MyPageBase: React.FC<MyPageBaseProps> = ({ children, userId }) => {
  return (
    <>
      <DashboardMenu userId={userId} />
      <div className=' flex h-fit min-h-screen animate-fade-in-fwd flex-col items-center lg:container lg:mx-auto'>
        {children}
      </div>
    </>
  )
}