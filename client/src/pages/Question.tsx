import { Outlet, useOutletContext } from 'react-router-dom'

export const Question = () => {
  const isAuth = useOutletContext() as boolean

  return <Outlet context={isAuth} />
}
