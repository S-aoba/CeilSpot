import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import { HeaderLight } from './HeaderLight/HeaderLight'

type Props = {
  isAuth: boolean
}
export const Header: React.FC<Props> = ({ isAuth }) => {
  return (
    <div className=' fixed top-0 z-10 flex h-14 max-h-14 w-full items-center justify-center bg-sky-100'>
      <div className=' flex lg:w-8/12'>
        <HeaderLeft />
        <HeaderLight isAuth={isAuth} />
      </div>
    </div>
  )
}
