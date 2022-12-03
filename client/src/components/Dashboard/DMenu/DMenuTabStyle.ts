import { useAppSelector } from '../../../app/hooks'
import { selectMenubarTab } from '../../../slices/appSlice'

export const MenuTabStyle = () => {
  const currentMenubarTab = useAppSelector(selectMenubarTab)

  const defaultTabStyle = 'flex items-center gap-2 text-base px-2'
  const selectedStyle = 'flex items-center gap-2 text-base px-2 text-sky-400 underline underline-offset-4'
  const questionsStyle = currentMenubarTab === 'question' ? selectedStyle : defaultTabStyle

  const answerStyle = currentMenubarTab === 'answer' ? selectedStyle : defaultTabStyle

  const profileStyle = currentMenubarTab === 'profile' ? selectedStyle : defaultTabStyle

  return { questionsStyle, answerStyle, profileStyle }
}
