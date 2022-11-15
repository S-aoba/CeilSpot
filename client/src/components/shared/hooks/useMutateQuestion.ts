import axios from 'axios'
import { useQueryClient, useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { resetEditedQuestion, toggleCsrfState, changeMenubarTab } from '../../../slices/appSlice'
import { QuestionType } from '../types/types'
import { useToastify } from './useToastify'

export const useMutateQuestion = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { toastInfo } = useToastify()
  const createQuestionMutation = useMutation(
    (question: Omit<QuestionType, 'id'>) =>
      axios.post<QuestionType>(`${import.meta.env.VITE_API_URL}/question`, question, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        const previousQuestions = queryClient.getQueryData<QuestionType[]>('questions')
        if (previousQuestions) {
          queryClient.setQueryData('questions', [...previousQuestions, res.data])
        }
        dispatch(resetEditedQuestion())
        toastInfo('投稿が完了しました')
        queryClient.invalidateQueries(['singleQuestion'])
        // queryClient.invalidateQueries(['userQuestions'])
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
  const updateQuestionMutation = useMutation(
    (question: QuestionType) =>
      axios.put<QuestionType>(
        `${import.meta.env.VITE_API_URL}/question/${question.id}`,
        {
          id: question.id,
          title: question.title,
          body: question.body,
          post_username: question.post_username,
          answer_list: question.answer_list,
          tags: question.tags,
        },
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousQuestions = queryClient.getQueryData<QuestionType[]>('questions')
        if (previousQuestions) {
          queryClient.setQueryData<QuestionType[]>(
            'questions',
            previousQuestions.map((question) => (question.id === variables.id ? res.data : question))
          )
        }
        dispatch(resetEditedQuestion())
        toastInfo('更新しました')
        queryClient.invalidateQueries(['questions'])
        queryClient.invalidateQueries(['userQuestions'])
        queryClient.invalidateQueries(['singleQuestion'])
        navigate(`/question/users/${variables.post_username}/${variables.id}`, {
          state: {
            id: variables.id,
            title: variables.title,
            body: variables.body,
            post_username: variables.post_username,
            answer_list: variables.answer_list,
            tags: variables.tags,
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
          dispatch(resetEditedQuestion())
          navigate('/')
        }
      },
    }
  )
  const deleteQuestionMutation = useMutation(
    (id: string) =>
      axios.delete<QuestionType>(`${import.meta.env.VITE_API_URL}/question/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (res, variables) => {
        const previousQuestions = queryClient.getQueryData<QuestionType[]>('questions')
        if (previousQuestions) {
          queryClient.setQueryData<QuestionType[]>(
            'questions',
            previousQuestions.filter((question) => question.id !== variables)
          )
        }
        dispatch(resetEditedQuestion())
        dispatch(changeMenubarTab('EveryoneQuestions'))
        toastInfo('削除しました')
        queryClient.invalidateQueries(['questions'])
        queryClient.invalidateQueries(['userQuestions'])
        navigate('/question')
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
  return {
    createQuestionMutation,
    updateQuestionMutation,
    deleteQuestionMutation,
  }
}
