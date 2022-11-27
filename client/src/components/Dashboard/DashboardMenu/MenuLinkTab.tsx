import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  userId: string
  path: string
  className: string
  icon: ReactNode
  tabWord: 'Question' | 'Answer' | 'Profile'
  onClick: () => void
}
export const MenuLinkTab: React.FC<Props> = ({ userId, path, className, icon, tabWord, onClick }) => {
  return (
    <Link to={path} relative='path' state={userId} className={className} onClick={onClick}>
      <span>{icon}</span>
      {tabWord}
    </Link>
  )
}
