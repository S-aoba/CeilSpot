import { ReactNode } from 'react'

type DetailTitleProps = {
  children: ReactNode
}

export const DetailTitle: React.FC<DetailTitleProps> = ({ children }) => {
  return (
    <div className=' w-10/12 py-5 font-mono text-2xl font-bold tracking-wide lg:w-fit lg:max-w-fit bg-red-400'>
      <p>{children}</p>
    </div>
  )
}
