import { Link } from 'react-router-dom'

type ButtonProps = {
  type: 'submit' | 'reset' | 'button' | 'link'
  children: string
  onClick: () => void
  path?: string
}

export const Button: React.FC<ButtonProps> = ({ type, onClick, children, path }) => {
  if (type === 'link') {
    return (
      <Link
        to={path!}
        onClick={onClick}
        className=' rounded-lg bg-blue-500 py-3 px-3 text-sm text-white hover:brightness-90'
      >
        {children}
      </Link>
    )
  } else {
    return (
      <button
        type={type}
        onClick={onClick}
        className=' rounded-lg bg-blue-500 py-3 px-3 text-sm text-white hover:brightness-90'
      >
        {children}
      </button>
    )
  }
}
