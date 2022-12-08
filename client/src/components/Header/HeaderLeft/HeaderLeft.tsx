import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'

export const HeaderLeft = () => {
  return (
    <div className=' col-span-5 flex items-center justify-center lg:justify-start px-3 lg:col-span-2'>
      <Link to={'/'}>
        <img src={Logo} alt='Logo' className='h-8' />
      </Link>
    </div>
  )
}
