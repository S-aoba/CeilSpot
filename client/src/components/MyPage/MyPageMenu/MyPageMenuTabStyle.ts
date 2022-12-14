import { useAppSelector } from '../../../store/app/hooks'
import { selectMenubarTab } from '../../../store/slices/menuBarSlice'

export const MyPageMenuTabStyle = () => {
  const currentMenubarTab = useAppSelector(selectMenubarTab)

  const defaultTabStyle = 'rounded-lg px-2 hover:text-stone-900'
  const selectedStyle = 'rounded-lg bg-blue-100 px-2 py-2 text-stone-900'
  const questionsStyle = currentMenubarTab.myPageMenu === 'myQuestion' ? selectedStyle : defaultTabStyle

  const answerStyle = currentMenubarTab.myPageMenu === 'myAnswer' ? selectedStyle : defaultTabStyle

  const profileStyle = currentMenubarTab.myPageMenu === 'myProfile' ? selectedStyle : defaultTabStyle

  return { questionsStyle, answerStyle, profileStyle }
}
