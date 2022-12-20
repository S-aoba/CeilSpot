import { useAppSelector } from '../../app/hooks'
import { selectMenubarTab } from '../../slices/menuBarSlice'

export const useGlobalMenuTabStyle = () => {
  const currentMenubarTab = useAppSelector(selectMenubarTab)

  const defaultGlobalMenuTabStyle = ' hover:text-black px-2 pb-1 hover:text-stone-900 '
  const selectedGlobalMenuTabStyle = ' border-b-2 border-zinc-900 px-2 pb-1 text-stone-900'

  let questionsStyle = defaultGlobalMenuTabStyle
  let eventStyle = defaultGlobalMenuTabStyle
  let informationStyle = defaultGlobalMenuTabStyle
  let myPageStyle = defaultGlobalMenuTabStyle

  if (currentMenubarTab.globalMenu === 'questions') questionsStyle = selectedGlobalMenuTabStyle
  else if (currentMenubarTab.globalMenu === 'event') eventStyle = selectedGlobalMenuTabStyle
  else if (currentMenubarTab.globalMenu === 'information') informationStyle = selectedGlobalMenuTabStyle
  else if (currentMenubarTab.globalMenu === 'myPage') myPageStyle = selectedGlobalMenuTabStyle
  else if (currentMenubarTab.globalMenu === 'default') {
    questionsStyle = defaultGlobalMenuTabStyle
    eventStyle = defaultGlobalMenuTabStyle
    informationStyle = defaultGlobalMenuTabStyle
    myPageStyle = defaultGlobalMenuTabStyle
  }

  return { questionsStyle, eventStyle, informationStyle, myPageStyle }
}
