import { useSelectQuestionIcon } from '../../hooks/useSelectQuestionIcon'

type DetailTagsProps = {
  tags: string[]
}

export const DetailTags: React.FC<DetailTagsProps> = ({ tags }) => {
  const { selectQuestionIcon } = useSelectQuestionIcon()

  return (
    <div className=' flex w-11/12 flex-wrap items-center justify-start gap-4 py-5'>
      {tags.map((tag) => (
        <div className=' flex justify-center gap-2 rounded-3xl border border-gray-300 py-1 px-3' key={tag}>
          <img src={selectQuestionIcon(tag)} alt='QuestionIcon' className=' h-6 w-6' />
          <p>{tag}</p>
        </div>
      ))}
    </div>
  )
}
