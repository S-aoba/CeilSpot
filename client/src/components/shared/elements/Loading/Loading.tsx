import { BeatLoader } from 'react-spinners'
import { RootBase } from '../../layout/RootBase'

export const Loading = () => {
  return (
    <RootBase>
      <div className=' text-center'>
        <BeatLoader color=' #38bdf8' size={20} className='py-10' />
      </div>
    </RootBase>
  )
}
