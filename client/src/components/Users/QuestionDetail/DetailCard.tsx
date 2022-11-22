import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { useQuerySingleQuestion } from '../../shared/hooks/UseQuery/useQuerySingleQuestion'
import { LinkBtn as UpdateBtn } from '../../shared/elements/LinkBtn'
import { useAppDispatch } from '../../../app/hooks'
import { setEditedQuestion, toggleEditMode } from '../../../slices/appSlice'
import { useMutateQuestion } from '../../shared/hooks/useMutateQuestion'
import { ModalBtn as DeleteBtn } from '../../shared/elements/ModalBtn'

type Props = {
  question_id: string
}

export const DetailCard: React.FC<Props> = ({ question_id }) => {
  const { data: dataQuestion } = useQuerySingleQuestion(question_id)
  const dispatch = useAppDispatch()
  const { deleteQuestionMutation } = useMutateQuestion()

  return (
    <div className='flex justify-center xl:col-span-9'>
      <div className=' flex w-6/12 flex-col items-center justify-center rounded-xl bg-white py-5 md:w-11/12 xl:w-full'>
        <div className=' flex w-11/12 flex-wrap items-center justify-start gap-4 py-5'>
          <p className=' font-bold'>タグ : </p>
          {dataQuestion?.tags.map((tag) => (
            <div className=' rounded-3xl border border-sky-400 py-1 px-3 text-sky-400' key={tag}>
              <p>{tag}</p>
            </div>
          ))}
        </div>
        <div className=' w-11/12'>
          <hr className='mb-6 border-gray-300' />
          <div>
            <MDEditor.Markdown
              source={dataQuestion?.body}
              style={{ whiteSpace: 'pre-wrap' }}
              className=' tracking-wide'
            />
          </div>
          <hr className=' my-6 border-gray-300' />
        </div>
        <div className=' flex w-11/12 items-center justify-end gap-3'>
          <UpdateBtn
            path='/question/ask'
            relative='path'
            children={<FiEdit className=' h-10 w-10 text-sky-400 hover:cursor-pointer hover:opacity-75' />}
            onClick={() => {
              dispatch(
                setEditedQuestion({
                  id: dataQuestion?.id!,
                  title: dataQuestion?.title!,
                  body: dataQuestion?.body!,
                  post_username: dataQuestion?.post_username!,
                  answer_list: dataQuestion?.answer_list!,
                  tags: dataQuestion?.tags!,
                })
              )
              dispatch(toggleEditMode(true))
            }}
          />
          <DeleteBtn
            modalTitle='削除してもよろしいですか？'
            children={<MdDeleteOutline className=' h-10 w-10 text-sky-400 hover:cursor-pointer hover:opacity-75' />}
            modalName='delete'
            onClick={() => {
              deleteQuestionMutation.mutate(question_id)
            }}
          />
        </div>
      </div>
    </div>
  )
}
