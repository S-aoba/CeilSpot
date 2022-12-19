import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useMemo } from 'react'
import { MarkdownPreview } from './MarkdownPreview'

type MarkdownEditorProps = {
  body: string
  onChange: (e: string) => void
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ body, onChange }) => {
  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: false,
      status: false,
    }
  }, [])

  return (
    <div className=' grid w-full grid-cols-2'>
      <SimpleMde className=' col-span-1' value={body} onChange={onChange} options={options} placeholder='質問の内容' />
      <MarkdownPreview body={body} />
    </div>
  )
}
