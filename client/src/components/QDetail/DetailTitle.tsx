import { ReactNode } from 'react'

type DetailTitleProps = {
  children: ReactNode
}

export const DetailTitle: React.FC<DetailTitleProps> = ({ children }) => {
  return (
    <div className=' w-fit max-w-fit py-10 font-mono text-2xl font-bold tracking-wide'>
      <p>{children}</p>
    </div>
  )
}
