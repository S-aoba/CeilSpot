import { Input as SearchBar } from '../../shared/elements/Input'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { useQueryUser } from '../../../functional/UseQuery/useQueryUser'
import { LinkBtn as QuestionPostBtn } from '../../shared/elements/LinkBtn'
import { ModalBtn as LogoutBtn } from '../../shared/elements/ModalBtn'
import { useProcessAuth } from '../../../functional/hooks/useProcessAuth'
import { useHeaderLight } from './useHeaderLight'
import { IconMenu } from './IconMenu'

export const HeaderLight: React.FC = () => {
  const { error } = useQueryUser()
  const { onChangeSearchValue, searchValue } = useHeaderLight()

  return (
    <div className='col-span-9 flex items-center justify-around gap-3 lg:col-span-10 lg:justify-start'>
      <SearchBar
        className=' w-8/12 rounded-3xl border py-3 pl-3 outline-sky-400'
        placeholder='Search...'
        value={searchValue}
        onChange={onChangeSearchValue}
      />
      {error ? (
        <>
          <Login className=' btn-info btn text-white hover:opacity-75'>Login</Login>
          <SignUp className=' btn-primary btn text-white hover:opacity-75'>SignUp</SignUp>
        </>
      ) : (
        <>
          <IconMenu />
          <QuestionPostBtn
            path='/question/ask'
            relative='path'
            children={'質問する'}
            className=' btn-info btn w-16 text-white hover:opacity-75 lg:w-24'
          />
        </>
      )}
    </div>
  )
}
