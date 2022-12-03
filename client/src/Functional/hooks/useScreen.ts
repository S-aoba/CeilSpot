import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { resetEditedQuestion, toggleEditMode } from '../../slices/appSlice'

export const useScreen = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const formScreenRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  const formScreenBrowserBack = (e: PopStateEvent) => {
    if (confirm('入力された内容が破棄されますがよろしいですか？')) {
      dispatch(resetEditedQuestion())
      dispatch(toggleEditMode(false))
      navigate(-1)
    } else {
      history.pushState(null, '', null)
    }
  }

  const screenWidthMonitoring = () => {
    setScreenWidth(window.innerWidth)
  }
  return { formScreenRefresh, formScreenBrowserBack, screenWidthMonitoring, screenWidth }
}
