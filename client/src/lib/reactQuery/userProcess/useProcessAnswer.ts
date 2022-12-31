import { FormEvent } from 'react'
import { useAppSelector } from '../../../redux/app/hooks'
import { selectAnswer } from '../../../redux/slices/answerSlice'
import { useMutateAnswer } from '../useMutate/useMutateAnswer'

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
