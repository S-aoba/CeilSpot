import { useAppSelector } from '../../../app/hooks'
import { selectMenubarTab } from '../../../slices/menuBarSlice'

export const MyPageMenuTabStyle = () => {
  const currentMenubarTab = useAppSelector(selectMenubarTab)

  const defaultTabStyle = 'rounded-lg px-2 py-1'
  const selectedStyle = 'rounded-lg bg-blue-500 px-2 py-2 text-white'
  const questionsStyle = currentMenubarTab.myPageMenu === 'myQuestion' ? selectedStyle : defaultTabStyle

  const answerStyle = currentMenubarTab.myPageMenu === 'myAnswer' ? selectedStyle : defaultTabStyle

  const profileStyle = currentMenubarTab.myPageMenu === 'myProfile' ? selectedStyle : defaultTabStyle

  return { questionsStyle, answerStyle, profileStyle }
}
