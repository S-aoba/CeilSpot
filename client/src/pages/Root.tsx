import { Outlet } from 'react-router-dom'
import { Error } from '../components/shared/elements/Error/Error'
import { Header } from '../components/Header/Header'
import { Loading } from '../components/shared/elements/Loading/Loading'
import { useQueryAuth } from '../functional/UseQuery/useQueryAuth'
import { Footer } from '../components/Footer/Footer'

export const Root = () => {
  const { data: isAuth, isLoading, error } = useQueryAuth()

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <div className=' h-fit min-h-fit bg-slate-100 pt-14'>
      <Header isAuth={isAuth!} />
      <div className=' flex justify-center bg-sky-100 py-2'>
        <div className=' container mx-auto'>
          <ul className=' flex list-none gap-x-5 font-mono text-sm tracking-wide text-stone-500 opacity-50	'>
            <li className=' border-b-2 border-zinc-900 pb-1 px-2'>質問</li>
            <li>イベント</li>
            <li>お知らせ</li>
          </ul>
        </div>
      </div>
      <Outlet context={isAuth!} />
      <Footer />
    </div>
  )
}
