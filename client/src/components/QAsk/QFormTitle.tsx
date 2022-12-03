import { useChangeTitle } from './hooks/useChangeTitle'

type QuestionFormTitleProps = {
  editedTitle: string
}

export const QuestionFormTitle: React.FC<QuestionFormTitleProps> = ({ editedTitle }) => {
  const { setTitleHandler } = useChangeTitle()

  return (
    <input
      type=' text'
      autoFocus
      className=' w-full border-gray-300 bg-slate-100 px-3 py-5 text-2xl outline-none'
      value={editedTitle}
      onChange={setTitleHandler}
      placeholder='質問のタイトル'
      maxLength={77}
      height='55px'
    />
  )
}
