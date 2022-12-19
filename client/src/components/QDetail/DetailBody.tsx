// import MDEditor from '@uiw/react-md-editor'

import DOMPurify from 'dompurify'
import { marked } from 'marked'
import Prism from 'prismjs'
import { useEffect } from 'react'

type DetailBodyProps = {
  body: string
}

export const DetailBody: React.FC<DetailBodyProps> = ({ body }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [body])
  return (
    <div className=' mt-1 w-11/12'>
      <div
        className=' bg-white p-[15px]'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(body)),
        }}
      ></div>
      <hr className=' my-6 border-gray-300' />
    </div>
  )
}
