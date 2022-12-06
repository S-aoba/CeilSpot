import { useAppSelector } from '../../app/hooks'
import { selectMenubarTab } from '../../slices/menuBarSlice'

export const useGlobalMenuTabStyle = () => {
  const currentMenubarTab = useAppSelector(selectMenubarTab)

  const defaultGlobalMenuTabStyle = ' hover:text-black px-2 pb-1'
  const selectedGlobalMenuTabStyle = ' border-b-2 border-zinc-900 px-2 pb-1'

  const questionsStyle =
    currentMenubarTab.globalMenu === 'questions' ? selectedGlobalMenuTabStyle : defaultGlobalMenuTabStyle

  const eventStyle = currentMenubarTab.globalMenu === 'event' ? selectedGlobalMenuTabStyle : defaultGlobalMenuTabStyle

  const informationStyle =
    currentMenubarTab.globalMenu === 'information' ? selectedGlobalMenuTabStyle : defaultGlobalMenuTabStyle

  const myPageStyle = currentMenubarTab.globalMenu === 'myPage' ? selectedGlobalMenuTabStyle : defaultGlobalMenuTabStyle

  return { questionsStyle, eventStyle, informationStyle, myPageStyle }
}
