import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { selectAnswer, setEditedAnswer } from '../../../slices/appSlice'
import { Button as SubmitBtn } from '../../shared/elements/Button'
import { Title } from '../../shared/elements/Title'
import { useProcessAnswer } from '../../shared/hooks/useProcessAnswer'
import { useQueryUser } from '../../shared/hooks/UseQuery/useQueryUser'

type Props = {
  question_id: string
}

export const AnswerReply: React.FC<Props> = ({ question_id }) => {
  const editedAnswer = useAppSelector(selectAnswer)
  const dispatch = useAppDispatch()
  const { data: dataUser } = useQueryUser()
  const { processAnswer } = useProcessAnswer()

  return (
    <form className='flex w-full justify-center' onSubmit={processAnswer}>
      <div className=' flex w-11/12 flex-col items-center justify-center rounded-2xl'>
        <Title className=' w-8/12 py-3 text-3xl font-bold'>Answer Form</Title>
        <div className=' flex h-fit w-8/12 flex-col items-center justify-center'>
          <MDEditor
            className=' w-full'
            value={editedAnswer.body}
            onChange={(e) => dispatch(setEditedAnswer({ ...editedAnswer, body: e! }))}
            height={500}
            preview='edit'
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
          <div className=' mt-5 w-full'>
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
        </div>
      </div>
    </form>
  )
}
