import { ReactNode } from 'react'

type DetailTitleProps = {
  children: ReactNode
}

export const DetailTitle: React.FC<DetailTitleProps> = ({ children }) => {
  return <div className=' py-5 text-center text-3xl w-8/12'>{children}</div>
}
