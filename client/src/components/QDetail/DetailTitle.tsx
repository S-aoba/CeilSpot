import { ReactNode } from 'react'

type DetailTitleProps = {
  children: ReactNode
}

export const DetailTitle: React.FC<DetailTitleProps> = ({ children }) => {
  return (
    <div className=' w-11/12 py-5 font-mono text-2xl font-bold tracking-wide lg:w-fit lg:max-w-fit'>
      <p>{children}</p>
    </div>
  )
}
