import { useAppSelector, useAppDispatch } from '../../redux/app/hooks'
import { useQueryUserIdAndUsername } from '../../lib/reactQuery/useQuery/useQueryUserIdAndUsername'
import { Error } from '../shared/elements/Error/Error'
import { Loading } from '../shared/elements/Loading/Loading'
import { selectAnswer, setEditedAnswer } from '../../redux/slices/answerSlice'
import { MarkdownEditor } from '../shared/elements/MarkdownEditor'
import { Button } from '../ui/Button'
import { useProcessAnswer } from '../../lib/reactQuery/userProcess/useProcessAnswer'

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
          <MarkdownEditor
            body={editedAnswer.body}
            onChange={(e) => dispatch(setEditedAnswer({ ...editedAnswer, body: e }))}
          />
          <div className=' mt-5 w-11/12 xl:w-9/12'>
            <Button
              disabled={!editedAnswer.body}
              type='submit'
              children='送信する'
              onClick={() =>
                dispatch(
                  setEditedAnswer({
                    ...editedAnswer,
                    question_id: question_id,
                    respondent_username: dataUserIdAndUsername.username,
                  })
                )
              }
            />
          </div>
        </form>
      )}
    </>
  )
}
