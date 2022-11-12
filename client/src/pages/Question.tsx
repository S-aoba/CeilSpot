import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'

export const Question = () => {
  return (
    <div className='h-fit min-h-screen bg-slate-200'>
      <Header />
      <div id='itemList'>
        <Outlet />
      </div>
    </div>
  )
}
