import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectQuestion, setEditedQuestion } from '../../../../slices/appSlice'

export const useChangeTitle = () => {
  const dispatch = useAppDispatch()
  const editedQuestion = useAppSelector(selectQuestion)
  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEditedQuestion({ ...editedQuestion, title: e.target.value }))
  }
  return { setTitleHandler }
}
