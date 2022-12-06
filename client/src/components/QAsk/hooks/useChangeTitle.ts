import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectQuestion, setEditedQuestion } from '../../../slices/questionSlice'

export const useChangeTitle = () => {
  const dispatch = useAppDispatch()
  const editedQuestion = useAppSelector(selectQuestion)
  const setTitleHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setEditedQuestion({ ...editedQuestion, title: e.target.value }))
  }
  return { setTitleHandler }
}
