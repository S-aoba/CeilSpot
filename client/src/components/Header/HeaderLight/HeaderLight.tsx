import { useLayoutEffect } from 'react'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { IconMenu } from './IconMenu'
import { useScreen } from '../../hooks/useScreen'
import { useDispatch } from 'react-redux'
import { changeMenubarTab, selectMenubarTab } from '../../../redux/slices/menuBarSlice'
import { useAppSelector } from '../../../redux/app/hooks'
import { Button as LinkBtn } from '../../ui/Button'

type Props = {
  isAuth: boolean
}
export const HeaderLight: React.FC<Props> = ({ isAuth }) => {
  const dispatch = useDispatch()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)
  const { screenWidth, screenWidthMonitoring } = useScreen()

  useLayoutEffect(() => {
    window.addEventListener('resize', screenWidthMonitoring)
  }, [screenWidth])

  return (
    <div className=' col-span-7 flex h-10 max-h-10 items-center justify-center gap-3 px-2 lg:col-span-10 lg:justify-end'>
      {isAuth ? (
        <div className=' flex items-center gap-2'>
          <IconMenu />
          <LinkBtn
            type='link'
            onClick={() => dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'default' }))}
            label='質問する'
            path='/question/ask'
          />
        </div>
      ) : (
        <div className=' flex items-center gap-2'>
          <Login className=' btn-info btn-sm btn h-10 text-white hover:opacity-75'>Login</Login>
          <SignUp className=' btn-primary btn-sm btn h-10 text-white hover:opacity-75'>SignUp</SignUp>
        </div>
      )}
    </div>
  )
}
