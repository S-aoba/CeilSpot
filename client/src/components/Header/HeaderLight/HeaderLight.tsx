import { Input as SearchBar } from '../../shared/elements/Input'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { LinkBtn as QuestionPostBtn } from '../../shared/elements/LinkBtn'
import { useHeaderLight } from './useHeaderLight'
import { IconMenu } from './IconMenu'

type Props = {
  isAuth: boolean
}
export const HeaderLight: React.FC<Props> = ({ isAuth }) => {
  const { onChangeSearchValue, searchValue } = useHeaderLight()
  return (
    <div className='flex h-10 max-h-10 w-10/12 justify-start gap-3 px-2'>
      <SearchBar
        className=' w-9/12 rounded-full border pl-3 outline-sky-400'
        placeholder='Search...'
        value={searchValue}
        onChange={onChangeSearchValue}
      />
      {isAuth ? (
        <>
          <IconMenu />
          <QuestionPostBtn
            path='/question/ask'
            relative='path'
            children={'質問する'}
            className=' btn-info btn-sm btn h-10 w-16 text-white hover:opacity-75 lg:w-24'
          />
        </>
      ) : (
        <div className=' flex items-center gap-2'>
          <Login className=' btn-info btn-sm btn h-10 text-white hover:opacity-75'>Login</Login>
          <SignUp className=' btn-primary btn-sm btn h-10 text-white hover:opacity-75'>SignUp</SignUp>
        </div>
      )}
    </div>
  )
}
