type QItemTitleProps = {
  title: string
}

export const QItemTitle: React.FC<QItemTitleProps> = ({ title }) => {
  return (
    <div className=' h-full px-3 justify-center items-center flex mt-2'>
      <h2 className=' text-base line-clamp-3 font-normal hover:underline hover:underline-offset-4'>{title}</h2>
    </div>
  )
}
