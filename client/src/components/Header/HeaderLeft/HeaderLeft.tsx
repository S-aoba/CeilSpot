import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.png'
export const HeaderLeft = () => {
  return (
    <div className=' col-span-3 flex items-center justify-center lg:col-span-2 lg:justify-start'>
      <Link to={'/'}>
        <img src={Logo} alt='Logo' className=' h-14 w-14' />
      </Link>
    </div>
  )
}
