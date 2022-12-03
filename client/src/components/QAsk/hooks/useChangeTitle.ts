import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectQuestion, setEditedQuestion, toggleEditMode } from '../../../slices/appSlice'

export const useChangeTitle = () => {
  const dispatch = useAppDispatch()
  const editedQuestion = useAppSelector(selectQuestion)
  const setTitleHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setEditedQuestion({ ...editedQuestion, title: e.target.value }))
    dispatch(toggleEditMode(true))
  }
  return { setTitleHandler }
}
