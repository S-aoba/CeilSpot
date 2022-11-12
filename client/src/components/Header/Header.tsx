import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import { HeaderLight } from './HeaderLight/HeaderLight'

export const Header = () => {
  return (
    <div className=' fixed flex h-16 w-full items-center bg-sky-100'>
      <div className=' grid grid-cols-12 md:container md:mx-auto'>
        <HeaderLeft />
        <HeaderLight />
      </div>
    </div>
  )
}
