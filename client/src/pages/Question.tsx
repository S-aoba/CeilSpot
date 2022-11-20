import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'

export const Question = () => {
  return (
    <div className=' min-h-screen bg-slate-200'>
      <Header />
      <Outlet />
    </div>
  )
}
