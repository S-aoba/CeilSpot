import MDEditor from '@uiw/react-md-editor'

type DetailBodyProps = {
  body: string
}

export const DetailBody: React.FC<DetailBodyProps> = ({ body }) => {
  return (
    <div className=' w-11/12'>
      <hr className='mb-6 border-gray-300' />
      <div>
        <MDEditor.Markdown source={body} style={{ whiteSpace: 'pre-wrap' }} className=' tracking-wide' />
      </div>
      <hr className=' my-6 border-gray-300' />
    </div>
  )
}
