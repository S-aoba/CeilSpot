import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.png'

export const HeaderLeft = () => {
  return (
    <div className=' col-span-3 flex items-center justify-center lg:col-span-2 lg:justify-start'>
      <Link to={'/'} className=' flex h-full w-full items-center justify-center'>
        <img src={Logo} alt='Logo' className='h-16 w-36' />
      </Link>
    </div>
  )
}
