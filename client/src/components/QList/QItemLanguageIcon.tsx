import { useSelectQuestionIcon } from '../../functional/hooks/useSelectQuestionIcon'

type QItemLanguageIconProps = {
  firstTag: string
}

export const QItemLanguageIcon: React.FC<QItemLanguageIconProps> = ({ firstTag }) => {
  const { selectQuestionIcon } = useSelectQuestionIcon()

  return (
    <div className=' flex w-32 items-center justify-center py-2 px-2'>
      <img src={selectQuestionIcon(firstTag)} alt='languageIcon' className=' h-16 w-16 rounded-full' />
    </div>
  )
}
