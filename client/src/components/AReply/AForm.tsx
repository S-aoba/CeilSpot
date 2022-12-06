import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Button as SubmitBtn } from '../shared/elements/Button'
import { useQueryUserIdAndUsername } from '../../functional/UseQuery/useQueryUserIdAndUsername'
import { Error } from '../shared/elements/Error/Error'
import { Loading } from '../shared/elements/Loading/Loading'
import { useProcessAnswer } from '../../functional/hooks/UserProcess/useProcessAnswer'
import { selectAnswer, setEditedAnswer } from '../../slices/answerSlice'

type Props = {
  question_id: string
}

export const AnswerForm: React.FC<Props> = ({ question_id }) => {
  const editedAnswer = useAppSelector(selectAnswer)
  const dispatch = useAppDispatch()
  const { processAnswer } = useProcessAnswer()
  const { data: dataUserIdAndUsername, isLoading, error } = useQueryUserIdAndUsername()

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <>
      {dataUserIdAndUsername && (
        <form className=' flex flex-col items-center lg:items-start' onSubmit={processAnswer}>
          <MDEditor
            className=' w-11/12 lg:w-full'
            value={editedAnswer.body}
            onChange={(e) => dispatch(setEditedAnswer({ ...editedAnswer, body: e! }))}
            height={500}
            preview='edit'
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
          <div className=' mt-5 w-11/12 xl:w-9/12'>
            <SubmitBtn
              onClick={() =>
                dispatch(
                  setEditedAnswer({
                    ...editedAnswer,
                    question_id: question_id,
                    respondent_username: dataUserIdAndUsername.username,
                  })
                )
              }
              className=' btn-info btn text-white hover:opacity-75'
              disabled={!editedAnswer.body}
            >
              送信する
            </SubmitBtn>
          </div>
        </form>
      )}
    </>
  )
}
