import { useAppSelector } from '../../../app/hooks'
import { selectMenubarTab } from '../../../slices/appSlice'

export const MenuTabStyle = () => {
  const currentMenubarTab = useAppSelector(selectMenubarTab)

  const defaultTabStyle =
    'flex h-full w-40 items-center justify-center gap-2 px-3 py-2 text-gray-400 hover:bg-gray-200 rounded-3xl hover:text-white'
  const selectedStyle =
    'flex h-full w-40 items-center justify-center gap-2 px-3 py-2 text-sky-400 rounded-3xl bg-sky-400 text-white'
  const questionsStyle = currentMenubarTab === 'question' ? selectedStyle : defaultTabStyle

  const answerStyle = currentMenubarTab === 'answer' ? selectedStyle : defaultTabStyle

  const profileStyle = currentMenubarTab === 'profile' ? selectedStyle : defaultTabStyle

  return { questionsStyle, answerStyle, profileStyle }
}
