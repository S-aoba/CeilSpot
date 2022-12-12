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
    }
  }, [])
  const onChange = useCallback((value: string) => {
    dispatch(setEditedQuestion({ ...editedQuestion, body: value! }))
  }, [])

  useEffect(() => {
    Prism.highlightAll()
  }, [editedQuestion.body])

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
        className=' col-span-1 py-3 min-h-fit rounded-b-xl border bg-white pl-3 pr-4 break-words'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(editedQuestion.body)),
        }}
      ></div>
    </div>
  )
}
