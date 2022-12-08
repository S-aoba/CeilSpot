type QItemTitleProps = {
  title: string
}

export const QItemTitle: React.FC<QItemTitleProps> = ({ title }) => {
  return (
    <div className=' row-span-4 flex items-center'>
      <p className=' text-lg font-semibold line-clamp-2 hover:underline hover:underline-offset-4'>{title}</p>
    </div>
  )
}
