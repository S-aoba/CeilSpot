import { ChangeEvent, useState } from 'react'
import { Button } from '../../shared/elements/Button'
import { Input as SearchBar } from '../../shared/elements/Input'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { useQueryUser } from '../../shared/hooks/UseQuery/useQueryUser'
import { LinkBtn as QuestionPostBtn } from '../../shared/elements/LinkBtn'
import { ModalBtn as LogoutBtn, ModalBtn } from '../../shared/elements/ModalBtn'
import { useProcessAuth } from '../../shared/hooks/useProcessAuth'
type Props = {
  displayWidth: number
}

export const HeaderLight: React.FC<Props> = ({ displayWidth }) => {
  const { data: dataUser, error } = useQueryUser()
  const [searchValue, setSearchValue] = useState('')
  const { logout } = useProcessAuth()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)
  return (
    <div className='col-span-9 flex items-center justify-around gap-3 lg:col-span-10 lg:justify-start'>
      <SearchBar
        className=' w-8/12 rounded-3xl border py-3 pl-3 outline-sky-400'
        placeholder='Search...'
        value={searchValue}
        onChange={onChangeHandler}
      />
      {error ? (
        <>
          <Login className=' btn-info btn text-white hover:opacity-75'>Login</Login>
          <SignUp className=' btn-primary btn text-white hover:opacity-75'>SignUp</SignUp>
        </>
      ) : (
        <>
          <Button>
            <img src={DefaultUserIcon} alt='userIcon' className=' h-12 w-12 rounded-full' />
          </Button>
          {displayWidth >= 576 && (
            <>
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
        </>
      )}
    </div>
  )
}
