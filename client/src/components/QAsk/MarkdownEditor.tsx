import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import Prism from 'prismjs'


export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState(
    '```js\nconst hello = 0\nconst test = () => {\nif(hello === 0){\nreturn true\n}\n```'
  )
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: false,
    }
  }, [])
  const onChange = useCallback((value: string) => {
    setMarkdownValue(value)
  }, [])

  useEffect(() => {
    Prism.highlightAll()
  }, [markdownValue])

  return (
    <>
      <SimpleMde
        value={markdownValue}
        onChange={onChange}
        options={autofocusNoSpellcheckerOptions}
        placeholder='Hello'
      />
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(markdownValue)),
        }}
      ></div>
    </>
  )
}
