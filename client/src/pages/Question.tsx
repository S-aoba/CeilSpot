import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'

export const Question = () => {
  return (
    <div className='h-fit min-h-screen bg-slate-200'>
      <Header />
      <div className=' pt-16 md:container md:mx-auto'>
        <div id='detail'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
