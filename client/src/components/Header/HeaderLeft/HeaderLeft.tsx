import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'

export const HeaderLeft = () => {
  return (
    <div className=' flex items-center justify-center'>
      <Link to={'/'} className=' flex h-full w-full items-center justify-start'>
        <img src={Logo} alt='Logo' className='h-8 rounded-full pr-5' />
      </Link>
    </div>
  )
}
