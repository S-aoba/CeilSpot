import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { resetEditedQuestion, toggleEditMode } from '../../../slices/appSlice'

export const usePageTransition = () => {
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
  return { formScreenRefresh, formScreenBrowserBack }
}
