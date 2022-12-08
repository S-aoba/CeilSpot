import MDEditor from '@uiw/react-md-editor'

type DetailBodyProps = {
  body: string
}

export const DetailBody: React.FC<DetailBodyProps> = ({ body }) => {
  return (
    <div className=' mt-1 w-11/12'>
      <MDEditor.Markdown source={body} style={{ whiteSpace: 'pre-wrap' }} className=' tracking-wide' />
      <hr className=' my-6 border-gray-300' />
    </div>
  )
}
