import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import { HeaderLight } from './HeaderLight/HeaderLight'

export const Header: React.FC = () => {
  return (
    <div className=' sticky top-0 z-10 flex h-20 max-h-20 w-full items-center bg-white py-3'>
      <div className=' container mx-auto grid grid-cols-12 px-10 lg:px-0'>
        <HeaderLeft />
        <HeaderLight />
      </div>
    </div>
  )
}
