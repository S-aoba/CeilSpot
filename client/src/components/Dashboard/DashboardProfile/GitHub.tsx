import { FaGithub } from 'react-icons/fa'

type Props = {
  githubURL: string
}
export const GitHub: React.FC<Props> = ({ githubURL }) => {
  return (
    <div className='w-full'>
      <div className=' mb-2 flex items-center gap-2'>
        <FaGithub />
        <p>Github</p>
      </div>
      <input
        type='text'
        className=' w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
        value={githubURL ? githubURL : ''}
        placeholder='githubURL'
      />
    </div>
  )
}