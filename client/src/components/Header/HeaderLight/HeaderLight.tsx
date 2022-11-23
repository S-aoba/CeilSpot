import { Input as SearchBar } from '../../shared/elements/Input'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { useQueryUser } from '../../../Functional/UseQuery/useQueryUser'
import { LinkBtn as QuestionPostBtn } from '../../shared/elements/LinkBtn'
import { ModalBtn as LogoutBtn } from '../../shared/elements/ModalBtn'
import { useProcessAuth } from '../../../Functional/hooks/useProcessAuth'
import { useHeaderLight } from './useHeaderLight'
import { IconMenu } from './IconMenu'
import { Loading } from '../../Loading/Loading'
import { Error } from '../../Error/Error'

export const HeaderLight: React.FC = () => {
  const { data: dataUserName, isLoading: isDataUserNameLoading, error } = useQueryUser()
  const { logout } = useProcessAuth()
  const { onChangeSearchValue, searchValue } = useHeaderLight()
  if (isDataUserNameLoading) return <Loading />

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
          {dataUserName && <IconMenu username={dataUserName.username} />}
          <QuestionPostBtn
            path='/question/ask'
            relative='path'
            children={'質問する'}
            className=' btn-info btn w-16 text-white hover:opacity-75 lg:w-24'
          />
          <LogoutBtn
            className=' btn-warning btn text-white hover:opacity-75'
            modalTitle='ログアウトしてもよろしいですか？'
            children={'ログアウト'}
            modalName='logout'
            onClick={logout}
          />
        </>
      )}
    </div>
  )
}
