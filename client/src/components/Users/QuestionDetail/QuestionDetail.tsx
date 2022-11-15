import LanguageIcon from '../../../assets/LanguageIcon/python.png'
import { Title } from '../../shared/elements/Title'
import { useLocation } from 'react-router-dom'
import { DetailCard } from './DetailCard'

type State = {
  id: string
}
export const QuestionDetail = () => {
  const location = useLocation()
  const { id } = location.state as State
  return (
    <div id='detail' className=' md:container md:mx-auto flex h-fit min-h-screen flex-col items-center py-20'>
      <Title className=' w-11/12 py-3 text-3xl font-bold xl:w-8/12'>Question Detail</Title>
      <div className=' flex h-fit w-11/12 flex-col items-center justify-center gap-8 py-5'>
        <div>
          <img src={LanguageIcon} alt='languageIcon' className=' h-24 w-24 rounded-full' />
        </div>
        <DetailCard id={id} />
      </div>
    </div>
  )
}
