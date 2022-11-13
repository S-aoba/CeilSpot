import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import { HeaderLight } from './HeaderLight/HeaderLight'

export const Header = () => {
  return (
    <div className=' fixed top-0 left-0 m-0 flex h-16 w-full items-center bg-sky-100'>
      <div className=' grid grid-cols-12 xl:container xl:mx-auto'>
        <HeaderLeft />
        <HeaderLight />
      </div>
    </div>
  )
}
