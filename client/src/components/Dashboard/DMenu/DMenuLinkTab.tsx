import { Link } from 'react-router-dom'

type Props = {
  userId: string
  path: string
  className: string
  tabWord: string
  onClick: () => void
}
export const MenuLinkTab: React.FC<Props> = ({ userId, path, className, tabWord, onClick }) => {
  return (
    <Link to={path} relative='path' state={userId} className={className} onClick={onClick}>
      {tabWord}
    </Link>
  )
}
