import axios from 'axios'
import { useAppDispatch } from '../../../app/hooks'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import {
  changeMenubarTab,
  resetEditedAnswer,
  resetEditedQuestion,
  toggleCsrfState,
  toggleEditMode,
} from '../../../slices/appSlice'
import { useQueryUser } from './UseQuery/useQueryUser'
import { useQuerySingleQuestion } from './UseQuery/useQuerySingleQuestion'
import { AnswerType } from '../types/types'
import { useToastify } from './useToastify'

export const useMutateAnswer = (question_id: string) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data: dataQuestion } = useQuerySingleQuestion(question_id)
  const { data: dataUser } = useQueryUser()
  const queryClient = useQueryClient()
  const { toastInfo } = useToastify()

  const createAnswerMutation = useMutation(
    (answer: Omit<AnswerType, 'id'>) =>
      axios.post<AnswerType>(`${import.meta.env.VITE_API_URL}/answer`, answer, {
        withCredentials: true,
      }),
    {
      onSuccess: (res, variables) => {
        dispatch(resetEditedAnswer())
        toastInfo('回答を送信しました')
        queryClient.invalidateQueries(['singleQuestion'])
        navigate(`/question/${dataQuestion?.post_username}/${dataQuestion?.id}`, {
          state: {
            id: dataQuestion!.id,
          },
        })
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedAnswer())
          navigate('/')
        }
      },
    }
  )
  const updateAnswerMutation = useMutation(
    (answer: AnswerType) =>
      axios.put<AnswerType>(
        `${import.meta.env.VITE_API_URL}/answer/${answer.id}`,
        {
          id: answer.id,
          body: answer.body,
          question_id: answer.question_id,
          respondent_username: answer.respondent_username,
        },
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res, variables) => {
        dispatch(resetEditedAnswer())
        alert('編集が完了しました')
        queryClient.invalidateQueries(['singleAnswer'])
        navigate(`/question/users/${dataUser?.username}/${dataQuestion?.id}`, {
          state: {
            id: dataQuestion!.id,
            title: dataQuestion!.title,
            body: dataQuestion!.body,
            post_username: dataQuestion!.post_username,
            answer_list: dataQuestion!.answer_list,
          },
        })
        dispatch(changeMenubarTab('MyQuestions'))
        // dispatch(toggleEditMode())
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedAnswer())
          navigate('/')
        }
      },
    }
  )
  const deleteAnswerMutation = useMutation(
    (id: string) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/answer/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        dispatch(resetEditedAnswer())
        alert('削除しました')
        queryClient.invalidateQueries(['singleQuestion'])
        queryClient.invalidateQueries(['singleAnswer'])
        dispatch(changeMenubarTab('EveryoneQuestions'))
        navigate('/')
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedQuestion())
          navigate('/')
        }
      },
    }
  )
  return { createAnswerMutation, updateAnswerMutation, deleteAnswerMutation }
}
