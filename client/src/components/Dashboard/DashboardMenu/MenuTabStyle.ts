import { useAppSelector } from '../../../app/hooks'
import { selectMenubarTab } from '../../../slices/appSlice'

export const MenuTabStyle = () => {
  const currentMenubarTab = useAppSelector(selectMenubarTab)

  const defaultTabStyle = 'flex h-full w-36 items-center gap-2 px-3 py-2 text-gray-400 hover:text-black'
  const selectedStyle =
    'underline-sky-400 flex h-full w-36 items-center gap-2 px-3 py-2  text-sky-400 underline underline-offset-8'
  const questionsStyle = currentMenubarTab === 'question' ? selectedStyle : defaultTabStyle

  const answerStyle = currentMenubarTab === 'answer' ? selectedStyle : defaultTabStyle

  const profileStyle = currentMenubarTab === 'profile' ? selectedStyle : defaultTabStyle

  return { questionsStyle, answerStyle, profileStyle }
}
