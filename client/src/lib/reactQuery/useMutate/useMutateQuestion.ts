import axios from 'axios'
import { useQueryClient, useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { toggleCsrfState } from '../../../slices/csrfSlice'
import { resetEditedQuestion } from '../../../slices/questionSlice'
import { QuestionType } from '../../../types/types'
import { useToastify } from '../../toastify/useToastify'

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
        // キャッシュされた質問データ配列に対して、該当の質問を挿入する
        const previousQuestions = queryClient.getQueryData<QuestionType[]>('questions')
        if (previousQuestions) {
          queryClient.setQueryData('questions', [...previousQuestions, res.data])
        }
        dispatch(resetEditedQuestion())
        // キャッシュデータの更新
        queryClient.invalidateQueries(['userQuestions'])
        navigate('/')
        toastInfo('みんなに質問しました！')
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
        // キャッシュされた質問データ配列に対して、該当の質問のみ更新する
        const previousQuestions = queryClient.getQueryData<QuestionType[]>('questions')
        if (previousQuestions) {
          queryClient.setQueryData<QuestionType[]>(
            'questions',
            previousQuestions.map((question) => (question.id === variables.id ? res.data : question))
          )
        }
        dispatch(resetEditedQuestion())
        queryClient.invalidateQueries(['questions'])
        queryClient.invalidateQueries(['userQuestions'])
        queryClient.invalidateQueries(['singleQuestion'])

        // 更新後のデータを画面遷移時に渡す
        navigate(`/${variables.post_username}/question/${variables.id}`, {
          state: {
            id: variables.id,
            title: variables.title,
            body: variables.body,
            post_username: variables.post_username,
            answer_list: variables.answer_list,
            tags: variables.tags,
            isDashboard: true,
          },
        })
        toastInfo('質問を更新しました')
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
  const deleteQuestionMutation = useMutation(
    (id: string) =>
      axios.delete<QuestionType>(`${import.meta.env.VITE_API_URL}/question/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (res, variables) => {
        // キャッシュされた質問データ配列に対して、フィルターをかけて該当の質問を削除
        const previousQuestions = queryClient.getQueryData<QuestionType[]>('questions')
        if (previousQuestions) {
          queryClient.setQueryData<QuestionType[]>(
            'questions',
            previousQuestions.filter((question) => question.id !== variables)
          )
        }
        dispatch(resetEditedQuestion())
        queryClient.invalidateQueries(['userQuestions'])
        queryClient.invalidateQueries(['userAnswers'])
        queryClient.invalidateQueries(['singleAnswer'])
        const userId = res.data
        navigate('/dashboard/question', { state: userId })
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
  return {
    createQuestionMutation,
    updateQuestionMutation,
    deleteQuestionMutation,
  }
}
