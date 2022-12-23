import { useSelectQuestionIcon } from '../../functional/hooks/useSelectQuestionIcon'

type QItemLanguageIconProps = {
  firstTag: string
}

export const QItemLanguageIcon: React.FC<QItemLanguageIconProps> = ({ firstTag }) => {
  const { selectQuestionIcon } = useSelectQuestionIcon()

  return (
    <div className=' flex items-center px-5'>
      <img src={selectQuestionIcon(firstTag)} alt='languageIcon' className=' h-14 w-14' />
    </div>
  )
}
