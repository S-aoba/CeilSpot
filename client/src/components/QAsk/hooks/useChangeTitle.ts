import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { selectQuestion, setEditedQuestion } from '../../../store/slices/questionSlice'

export const useChangeTitle = () => {
  const dispatch = useAppDispatch()
  const editedQuestion = useAppSelector(selectQuestion)
  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEditedQuestion({ ...editedQuestion, title: e.target.value }))
  }
  return { setTitleHandler }
}
