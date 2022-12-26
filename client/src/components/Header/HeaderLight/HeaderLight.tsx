import { BiSearchAlt2 } from 'react-icons/bi'
import { useLayoutEffect } from 'react'
import { Input as SearchBar } from '../../shared/elements/Input'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { useHeaderLight } from './useHeaderLight'
import { IconMenu } from './IconMenu'
import { useScreen } from '../../../functional/hooks/useScreen'
import { useDispatch } from 'react-redux'
import { changeMenubarTab, selectMenubarTab } from '../../../slices/menuBarSlice'
import { useAppSelector } from '../../../app/hooks'
import { Button as LinkBtn } from '../../ui/Button'

type Props = {
  isAuth: boolean
}
export const HeaderLight: React.FC<Props> = ({ isAuth }) => {
  const dispatch = useDispatch()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)
  const { onChangeSearchValue, searchValue } = useHeaderLight()
  const { screenWidth, screenWidthMonitoring } = useScreen()

  useLayoutEffect(() => {
    window.addEventListener('resize', screenWidthMonitoring)
  }, [screenWidth])

  return (
    <div className=' col-span-7 flex h-10 max-h-10 items-center justify-center gap-3 px-2 lg:col-span-10 lg:justify-end'>
      {screenWidth > 992 ? (
        <SearchBar
          className=' h-5/6 w-5/12 rounded-lg border pl-3 outline-sky-400'
          placeholder='Search...'
          value={searchValue}
          onChange={onChangeSearchValue}
        />
      ) : (
        <BiSearchAlt2 className=' h-9 w-7 text-gray-400 hover:cursor-pointer' />
      )}
      {isAuth ? (
        <>
          <IconMenu />
          <LinkBtn
            type='link'
            onClick={() => dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'default' }))}
            children='質問する'
            path='/question/ask'
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
