import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import { selectQuestion, setEditedQuestion } from '../../../redux/slices/questionSlice'

export const useChangeTitle = () => {
  const dispatch = useAppDispatch()
  const editedQuestion = useAppSelector(selectQuestion)
  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEditedQuestion({ ...editedQuestion, title: e.target.value }))
  }
  return { setTitleHandler }
}
