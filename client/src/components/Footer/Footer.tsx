import Logo from '../../assets/logo.png'
import { About } from './About'
import { Legal } from './Legal'
import { Links } from './Links'

export const Footer = () => {
  return (
    <div className=' flex flex-1 justify-center bg-sky-100 pt-16 pb-5 tracking-wider'>
      <div className=' flex w-11/12 justify-center gap-x-16 pb-20'>
        <div className=' flex flex-col items-center gap-y-3 px-5 pt-5'>
          <img src={Logo} alt='logo' className=' h-10' />
          <p className=' text-sm text-gray-400'>迷わず、赴くままに。</p>
        </div>
        <About />
        <Legal />
        <Links />
      </div>
    </div>
  )
}
