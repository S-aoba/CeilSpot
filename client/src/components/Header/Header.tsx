import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import { HeaderLight } from './HeaderLight/HeaderLight'

type HeaderProps = {
  isAuth: boolean
}
export const Header: React.FC<HeaderProps> = ({ isAuth }) => {
  return (
    <div className=' fixed top-0 z-10 flex h-14 max-h-14 w-full items-center justify-center bg-white'>
      <div className=' container mx-auto grid grid-cols-12 pl-5'>
        <HeaderLeft />
        <HeaderLight isAuth={isAuth} />
      </div>
    </div>
  )
}
