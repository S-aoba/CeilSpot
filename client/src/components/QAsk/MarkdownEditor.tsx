import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import Prism from 'prismjs'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectQuestion, setEditedQuestion } from '../../slices/questionSlice'

export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState('')
  const editedQuestion = useAppSelector(selectQuestion)
  const dispatch = useAppDispatch()
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: false,
      status: false,
      styles: false,
    }
  }, [])
  const onChange = useCallback((value: string) => {
    setMarkdownValue(value)
  }, [])

  useEffect(() => {
    Prism.highlightAll()
  }, [markdownValue])

  return (
    <div className=' grid w-full grid-cols-2'>
      <SimpleMde
        className=' col-span-1'
        value={markdownValue}
        onChange={onChange}
        options={autofocusNoSpellcheckerOptions}
        placeholder='質問の内容'
      />
      <div
        className=' col-span-1 h-fit whitespace-pre-wrap rounded-br-md rounded-bl-lg bg-white p-[15px]'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(markdownValue)),
        }}
      ></div>
    </div>
  )
}
