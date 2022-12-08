import { ReactNode } from 'react'

type DetailTitleProps = {
  children: ReactNode
}

export const DetailTitle: React.FC<DetailTitleProps> = ({ children }) => {
  return (
    <div className=' mt-5 w-10/12 py-5 font-mono text-2xl font-bold tracking-wide lg:w-9/12'>
      <p>{children}</p>
    </div>
  )
}
