import { Link } from 'react-router-dom'

type ButtonProps = {
  type: 'submit' | 'reset' | 'button' | 'link'
  children: string
  onClick: () => void
  path?: string
  disable: boolean
}

export const Button: React.FC<ButtonProps> = ({ type, onClick, children, path, disable }) => {
  console.log(disable)

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
        disabled={disable}
        type={type}
        onClick={onClick}
        className=' rounded-lg bg-blue-500 py-3 px-3 text-sm text-white hover:brightness-90 disabled:opacity-40 disabled:brightness-100'
      >
        {children}
      </button>
    )
  }
}
