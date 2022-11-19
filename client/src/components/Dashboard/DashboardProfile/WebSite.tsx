import { CgWebsite } from 'react-icons/cg'
type Props = {
  websiteURL: string
}

export const WebSite: React.FC<Props> = ({ websiteURL }) => {
  return (
    <div className='w-full'>
      <div className=' mb-2 flex items-center gap-2'>
        <CgWebsite className=' text-green-500' />
        <p>Website</p>
      </div>
      <input
        type='text'
        className=' w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
        value={websiteURL ? websiteURL : ''}
        placeholder='websiteURL'
      />
    </div>
  )
}
