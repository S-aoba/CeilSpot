import { selectQuestion, setEditedQuestion } from '../../../slices/appSlice'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import Select from 'react-select'
import { Input as TitleInput } from '../../shared/elements/Input'
import { Button as SubmitBtn } from '../../shared/elements/Button'
import { TagStyle } from '../../shared/styles/TagStyle'
import { useProcessQuestion } from '../../shared/hooks/useProcessQuestion'
import { useQueryUser } from '../../shared/hooks/useQueryUser'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useTag } from './hooks/useTag'
import { useChangeTitle } from './hooks/UseChangeTitle'
export const QuestionForm = () => {
  const { tagOptions, tagColorStyles } = TagStyle()
  const { processQuestion } = useProcessQuestion()
  const { data: dataUser } = useQueryUser()
  const editedQuestion = useAppSelector(selectQuestion)
  const dispatch = useAppDispatch()
  const { convertToTagType, multiValue, setMultiValue } = useTag()
  const { setTitleHandler } = useChangeTitle()
  return (
    <form onSubmit={processQuestion} className='flex w-full justify-center'>
      <div className=' flex w-8/12 flex-col items-center justify-center gap-5 rounded-xl bg-white py-10'>
        <div className=' grid w-11/12 grid-cols-12 gap-3'>
          <TitleInput
            className=' col-span-6 border border-gray-300 px-3 outline-sky-400'
            value={editedQuestion.title}
            onChange={setTitleHandler}
            placeholder='質問のタイトル'
          />
          <Select
            name='Tags'
            isOptionDisabled={() => multiValue?.length! >= 5}
            value={multiValue}
            onChange={(val) => setMultiValue(val)}
            closeMenuOnSelect={false}
            options={tagOptions}
            styles={tagColorStyles}
            className='col-span-6'
            isMulti
            isSearchable
            isClearable
            placeholder='タグを5つまで選択できます'
            noOptionsMessage={() => '一致するタグがありません'}
          />
        </div>
        <MDEditor
          className=' w-11/12'
          value={editedQuestion.body}
          onChange={(e) => dispatch(setEditedQuestion({ ...editedQuestion, body: e! }))}
          height={500}
          preview='edit'
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
        <div className=' flex w-11/12 flex-col items-center justify-center gap-3 lg:flex lg:flex-row lg:justify-start'>
          <SubmitBtn
            onClick={() => {
              dispatch(
                setEditedQuestion({
                  ...editedQuestion,
                  post_username: dataUser?.username!,
                  tags: convertToTagType(multiValue),
                })
              )
            }}
            className=' btn-info btn text-white hover:opacity-75'
            disabled={!editedQuestion.title || !editedQuestion.body}>
            {editedQuestion.id === '' ? '送信する' : '更新する'}
          </SubmitBtn>
        </div>
      </div>
    </form>
  )
}
