import { useChangeTitle } from './hooks/useChangeTitle'

type QuestionFormTitleProps = {
  editedTitle: string
}

export const QuestionFormTitle: React.FC<QuestionFormTitleProps> = ({ editedTitle }) => {
  const { setTitleHandler } = useChangeTitle()

  return (
    <input
      autoFocus
      className=' w-full resize-none bg-slate-100 px-3 py-3 text-2xl font-bold outline-none'
      value={editedTitle}
      onChange={setTitleHandler}
      placeholder='質問のタイトル'
      maxLength={77}
    />
  )
}
