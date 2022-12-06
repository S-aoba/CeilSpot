import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { resetEditedAnswer } from '../../../slices/answerSlice'
import { toggleCsrfState } from '../../../slices/csrfSlice'
import { resetEditedQuestion } from '../../../slices/questionSlice'
import { AnswerType, QuestionType } from '../../../types/types'
import { useToastify } from '../useToastify'

export const useMutateAnswer = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { toastInfo } = useToastify()

  const createAnswerMutation = useMutation(
    (answer: Omit<AnswerType, 'id'>) =>
      axios.post<QuestionType>(`${import.meta.env.VITE_API_URL}/answer`, answer, {
        withCredentials: true,
      }),
    {
      onSuccess: (res, variables) => {
        dispatch(resetEditedAnswer())
        queryClient.invalidateQueries(['questions'])
        queryClient.invalidateQueries(['singleQuestion'])
        queryClient.invalidateQueries(['singleAnswer'])
        queryClient.invalidateQueries(['userAnswers'])
        navigate(``, {
          state: {
            id: res.data.id,
            title: res.data.title,
            body: res.data.body,
            post_username: res.data.post_username,
            answer_list: res.data.answer_list,
            tags: res.data.tags,
            isDashboard: false,
          },
        })
        toastInfo('回答しました！ナイス回答！')
      },
      onError: (err: any) => {
        // エラー内容を知らせる
        // Hack: エラーの文言を変えよう！今のままだと分かりにくいよ
        toastInfo(`${err.response.data.detail}\n${err.message}`)
        // 以下は、変える必要なし
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
        queryClient.invalidateQueries(['questions'])
        queryClient.invalidateQueries(['singleQuestion'])
        queryClient.invalidateQueries(['userAnswers'])
        navigate(`/question/${params.username}/${params.question_id}`, {
          state: {
            id: params.question_id,
            isDashboard: true,
          },
        })
        toastInfo('回答を更新しました')
      },
      onError: (err: any) => {
        // エラー内容を知らせる
        // Hack: エラーの文言を変えよう！今のままだと分かりにくいよ
        toastInfo(`${err.response.data.detail}\n${err.message}`)
        // 以下は、変える必要なし
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
    (answer_id: string) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/answer/${answer_id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        dispatch(resetEditedAnswer())
        queryClient.invalidateQueries(['questions'])
        queryClient.invalidateQueries(['singleQuestion'])
        queryClient.invalidateQueries(['singleAnswer'])
        queryClient.invalidateQueries(['userQuestions'])
        queryClient.invalidateQueries(['userAnswers'])
        navigate('/dashboard/answer', { state: res.data })
        toastInfo('削除しました')
      },
      onError: (err: any) => {
        // エラー内容を知らせる
        // Hack: エラーの文言を変えよう！今のままだと分かりにくいよ
        toastInfo(`${err.response.data.detail}\n${err.message}`)
        // 以下は、変える必要なし
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
