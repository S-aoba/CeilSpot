import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  path: string //必須
  relative: 'path' //必須
  children: ReactNode //必須
  className?: string // オプション
  onClick?: () => void // オプション
}

export const LinkBtn: React.FC<Props> = ({ path, relative, children, className, onClick }) => {
  return (
    <Link to={path} relative={relative} onClick={onClick}>
      <button className={className}>{children}</button>
    </Link>
  )
}
