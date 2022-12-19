import DOMPurify from 'dompurify'
import { marked } from 'marked'
import Prism from 'prismjs'
import { useEffect } from 'react'

type MarkdownPreviewProps = {
  body: string
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ body }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [body])

  return (
    <div
      className=' col-span-1 box-border rounded-br rounded-bl border-b-[1px] border-r-[1px] border-t-[1px] border-[#ced4da] bg-white p-[15px]'
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(body)),
      }}
    ></div>
  )
}
