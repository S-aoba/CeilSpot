import { FormEvent } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectAnswer } from '../../../slices/appSlice'
import { useMutateAnswer } from '../UseMutate/useMutateAnswer'

export const useProcessAnswer = () => {
  const editedAnswer = useAppSelector(selectAnswer)
  const { createAnswerMutation, updateAnswerMutation } = useMutateAnswer()
  const processAnswer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedAnswer.id === '') {
      createAnswerMutation.mutate({
        body: editedAnswer.body,
        question_id: editedAnswer.question_id,
        respondent_username: editedAnswer.respondent_username,
      })
    } else {
      updateAnswerMutation.mutate(editedAnswer)
    }
  }
  return { processAnswer }
}
