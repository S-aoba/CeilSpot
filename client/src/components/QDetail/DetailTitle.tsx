import { ReactNode } from 'react'

type DetailTitleProps = {
  children: ReactNode
}

export const DetailTitle: React.FC<DetailTitleProps> = ({ children }) => {
  return (
    <div className=' w-fit max-w-fit bg-blue-300 py-5 font-mono text-2xl font-bold'>
      <p>{children}</p>
    </div>
  )
}
