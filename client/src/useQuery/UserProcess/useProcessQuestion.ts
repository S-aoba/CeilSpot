import { FormEvent } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectQuestion } from '../../slices/questionSlice'
import { useMutateQuestion } from '../useMutate/useMutateQuestion'

export const useProcessQuestion = () => {
  const editedQuestion = useAppSelector(selectQuestion)
  const { createQuestionMutation, updateQuestionMutation } = useMutateQuestion()
  const processQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedQuestion.id === '') {
      createQuestionMutation.mutate({
        title: editedQuestion.title,
        body: editedQuestion.body,
        post_username: editedQuestion.post_username,
        answer_list: editedQuestion.answer_list,
        tags: editedQuestion.tags,
      })
    } else {
      updateQuestionMutation.mutate(editedQuestion)
    }
  }
  return { processQuestion }
}
