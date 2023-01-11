import { Link } from 'react-router-dom'
import { UserIdAndUsernameType } from '../../../types'

type Props = {
  userIdAndUsername: UserIdAndUsernameType
  path: string
  className: string
  tabWord: string
  onClick: () => void
}
export const MyPageMenuLinkTab: React.FC<Props> = ({ userIdAndUsername, path, className, tabWord, onClick }) => {
  return (
    <Link to={path} relative='path' state={userIdAndUsername} className={className} onClick={onClick}>
      {tabWord}
    </Link>
  )
}
