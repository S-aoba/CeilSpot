import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  username: string
  path: string
  className: string
  icon: ReactNode
  tabWord: 'Question' | 'Answer' | 'Profile'
}
export const MenuLinkTab: React.FC<Props> = ({ username, path, className, icon, tabWord }) => {
  return (
    <Link to={path} relative='path' state={username} className={className}>
      <span>{icon}</span>
      {tabWord}
    </Link>
  )
}
