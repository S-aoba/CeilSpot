import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectAnswer, setEditedAnswer } from '../../../slices/appSlice'
import { Button as SubmitBtn } from '../../shared/elements/Button'
import { useProcessAnswer } from '../../../functional/hooks/useProcessAnswer'
import { useQueryUserIdAndUsername } from '../../../functional/UseQuery/useQueryUserIdAndUsername'

type Props = {
  question_id: string
}

export const AnswerForm: React.FC<Props> = ({ question_id }) => {
  const editedAnswer = useAppSelector(selectAnswer)
  const dispatch = useAppDispatch()
  const { data: dataUser } = useQueryUserIdAndUsername()
  const { processAnswer } = useProcessAnswer()

  return (
    <form className=' flex w-full flex-col items-center justify-center xl:items-start' onSubmit={processAnswer}>
      <MDEditor
        className=' w-11/12 xl:w-9/12'
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
                respondent_username: dataUser!.username,
              })
            )
          }
          className=' btn-info btn text-white hover:opacity-75'
          disabled={!editedAnswer.body}>
          送信する
        </SubmitBtn>
      </div>
    </form>
  )
}
