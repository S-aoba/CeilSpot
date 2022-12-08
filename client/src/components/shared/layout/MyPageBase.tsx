import { ReactNode } from 'react'
import { MyPageMenu } from '../../MyPage/MyPageMenu/MyPageMenu'

type MyPageBaseProps = {
  children: ReactNode
  userId: string
}
export const MyPageBase: React.FC<MyPageBaseProps> = ({ children, userId }) => {
  return (
    <>
      <MyPageMenu userId={userId} />
      <div className=' flex h-fit min-h-screen animate-fade-in-fwd flex-col items-center lg:container lg:mx-auto'>
        {children}
      </div>
    </>
  )
}
