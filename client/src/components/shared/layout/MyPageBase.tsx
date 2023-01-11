import { ReactNode } from 'react'
import { UserIdAndUsernameType } from '../../../types'
import { MyPageMenu } from '../../MyPage/MyPageMenu/MyPageMenu'

type MyPageBaseProps = {
  children: ReactNode
  userIdAndUsername: UserIdAndUsernameType
}
export const MyPageBase: React.FC<MyPageBaseProps> = ({ children, userIdAndUsername }) => {
  return (
    <>
      <MyPageMenu userIdAndUsername={userIdAndUsername} />
      <div className=' container mx-auto flex h-fit min-h-screen animate-fade-in-fwd flex-col items-center'>
        {children}
      </div>
    </>
  )
}
