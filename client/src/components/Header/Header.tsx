import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import { HeaderLight } from './HeaderLight/HeaderLight'
type Props = {
  isAuth: boolean
}
export const Header: React.FC<Props> = ({ isAuth }) => {
  return (
    <div className=' fixed top-0 z-10 flex h-20 max-h-20 w-full items-center bg-sky-100'>
      <div className=' container mx-auto grid grid-cols-12 px-10 lg:px-0'>
        <HeaderLeft />
        <HeaderLight isAuth={isAuth} />
      </div>
    </div>
  )
}
