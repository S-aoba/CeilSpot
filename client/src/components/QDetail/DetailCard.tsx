import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { LinkBtn as UpdateBtn } from '../shared/elements/LinkBtn'
import { useAppDispatch } from '../../app/hooks'
import { setEditedQuestion, toggleEditMode } from '../../slices/appSlice'
import { useMutateQuestion } from '../../functional/hooks/useMutateQuestion'
import { ModalBtn as DeleteBtn } from '../shared/elements/ModalBtn'
import { QuestionType } from '../../types/types'
import { useSelectQuestionIcon } from '../../functional/hooks/useSelectQuestionIcon'

export const DetailCard: React.FC<QuestionType & { isDashboard: boolean }> = ({
  id,
  title,
  body,
  post_username,
  answer_list,
  tags,
  isDashboard,
}) => {
  const dispatch = useAppDispatch()
  const { deleteQuestionMutation } = useMutateQuestion()
  const { selectQuestionIcon } = useSelectQuestionIcon()

  return (
    <div className='flex justify-center xl:col-span-9'>
      <div className=' flex h-fit w-6/12 flex-col items-center rounded-xl bg-white py-5 md:w-11/12 xl:w-full'>
        <div className=' flex w-11/12 flex-wrap items-center justify-start gap-4 py-5'>
          {tags.map((tag) => (
            <div className=' flex justify-center gap-2 rounded-3xl border border-gray-300 py-1 px-3' key={tag}>
              <img src={selectQuestionIcon(tag)} alt='QuestionIcon' className=' h-6 w-6' />
              <p>{tag}</p>
            </div>
          ))}
        </div>
        <div className=' w-11/12'>
          <hr className='mb-6 border-gray-300' />
          <div>
            <MDEditor.Markdown source={body} style={{ whiteSpace: 'pre-wrap' }} className=' tracking-wide' />
          </div>
          <hr className=' my-6 border-gray-300' />
        </div>
        <div className=' flex w-11/12 items-center justify-end gap-3'>
          {isDashboard && (
            <>
              <UpdateBtn
                path='/question/ask'
                relative='path'
                children={<FiEdit className=' h-10 w-10 text-sky-400 hover:cursor-pointer hover:opacity-75' />}
                onClick={() => {
                  dispatch(
                    setEditedQuestion({
                      id,
                      title,
                      body,
                      post_username,
                      answer_list,
                      tags,
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
                  deleteQuestionMutation.mutate(id)
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
