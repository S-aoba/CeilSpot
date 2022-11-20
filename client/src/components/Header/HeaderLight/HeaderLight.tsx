import { Input as SearchBar } from '../../shared/elements/Input'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { useQueryUser } from '../../shared/hooks/UseQuery/useQueryUser'
import { LinkBtn as QuestionPostBtn } from '../../shared/elements/LinkBtn'
import { ModalBtn as LogoutBtn } from '../../shared/elements/ModalBtn'
import { useProcessAuth } from '../../shared/hooks/useProcessAuth'
import { useHeaderLight } from './useHeaderLight'
import { IconMenu } from './IconMenu'
import { useQueryUserInfo } from '../../shared/hooks/UseQuery/useQueryUserInfo'
type Props = {
  displayWidth: number
}

export const HeaderLight: React.FC<Props> = ({ displayWidth }) => {
  const { data: dataUser, error, isLoading: isUserDataLoading } = useQueryUser()
  const { logout } = useProcessAuth()
  const { onChangeSearchValue, searchValue } = useHeaderLight()
  const { data: dataUserInfo, isLoading: iseUserInfoLoading } = useQueryUserInfo(dataUser?.username!)
  if (isUserDataLoading || iseUserInfoLoading) {
    return (
      <div>
        <p>isLoading..</p>
      </div>
    )
  }

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
          <IconMenu
            username={dataUserInfo?.username!}
            self_introduction={dataUserInfo?.self_introduction!}
            twitter={dataUserInfo?.twitter!}
            github={dataUserInfo?.github!}
            website={dataUserInfo?.website!}
          />
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
