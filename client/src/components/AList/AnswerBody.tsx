import DOMPurify from 'dompurify'
import { marked } from 'marked'
import Prism from 'prismjs'
import { useEffect } from 'react'

type AnswerBOdyProps = {
  body: string
}

export const AnswerBody: React.FC<AnswerBOdyProps> = ({ body }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [body])

  return (
    <div
      className=' bg-white p-[15px]'
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(body)),
      }}
    ></div>
  )
}
