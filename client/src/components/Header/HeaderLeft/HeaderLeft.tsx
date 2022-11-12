import Logo from '../../../assets/logo.png'
export const HeaderLeft = () => {
  return (
    <div className=' col-span-3 flex items-center justify-start md:col-span-2'>
      <img src={Logo} alt='Logo' className=' h-14 w-14' />
    </div>
  )
}
