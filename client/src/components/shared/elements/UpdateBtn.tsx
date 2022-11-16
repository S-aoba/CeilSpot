import { FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type Props = {
  path: string
  relative: 'path'
  onClick: () => void
}

export const UpdateBtn: React.FC<Props> = ({ path, relative, onClick }) => {
  return (
    <Link to={path} relative={relative}>
      <FiEdit className=' h-10 w-10 text-sky-400 hover:cursor-pointer hover:opacity-75' onClick={onClick} />
    </Link>
  )
}
