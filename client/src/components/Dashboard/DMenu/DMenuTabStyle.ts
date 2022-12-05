import { useAppSelector } from '../../../app/hooks'
import { selectMenubarTab } from '../../../slices/appSlice'

export const MenuTabStyle = () => {
  const currentMenubarTab = useAppSelector(selectMenubarTab)

  const defaultTabStyle = 'rounded-lg px-2 py-1'
  const selectedStyle = 'rounded-lg bg-blue-500 px-2 py-2 text-white'
  const questionsStyle = currentMenubarTab === 'question' ? selectedStyle : defaultTabStyle

  const answerStyle = currentMenubarTab === 'answer' ? selectedStyle : defaultTabStyle

  const profileStyle = currentMenubarTab === 'profile' ? selectedStyle : defaultTabStyle

  return { questionsStyle, answerStyle, profileStyle }
}
