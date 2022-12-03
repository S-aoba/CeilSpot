import { useChangeTitle } from './hooks/useChangeTitle'

type QuestionFormTitleProps = {
  editedTitle: string
}

export const QuestionFormTitle: React.FC<QuestionFormTitleProps> = ({ editedTitle }) => {
  const { setTitleHandler } = useChangeTitle()

  return (
    <textarea
      autoFocus
      className=' w-full h-56 md:h-48 lg:h-36 xl:h-28  resize-none font-bold bg-slate-100 px-3 pt-5 text-2xl outline-none'
      value={editedTitle}
      onChange={setTitleHandler}
      placeholder='質問のタイトル'
      maxLength={77}
    />
  )
}
