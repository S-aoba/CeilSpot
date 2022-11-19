import { FaTwitter } from 'react-icons/fa'
type Props = {
  twitterURL: string
}
export const Twitter: React.FC<Props> = ({ twitterURL }) => {
  return (
    <div className='w-full'>
      <div className=' mb-2 flex items-center gap-2'>
        <FaTwitter color='#1DA1F2' />
        <p>Twitter</p>
      </div>
      <input
        type='text'
        className=' w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
        value={twitterURL ? twitterURL : ''}
        placeholder='twitterURL'
      />
    </div>
  )
}
