import { selectEditMode, selectQuestion, setEditedQuestion, toggleEditMode } from '../../slices/appSlice'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import Select from 'react-select'
import { Input as TitleInput } from '../shared/elements/Input'
import { Button as SubmitBtn } from '../shared/elements/Button'
import { TagStyle } from './styles/TagStyle'
import { useProcessQuestion } from '../../functional/hooks/useProcessQuestion'
import { useQueryUserIdAndUsername } from '../../functional/UseQuery/useQueryUserIdAndUsername'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useTag } from './hooks/useTag'
import { useChangeTitle } from './hooks/useChangeTitle'
import { useEffect, useState } from 'react'
import { usePageTransition } from '../../functional/hooks/usePageTransition'
import { Loading } from '../shared/elements/Loading/Loading'
import { Error } from '../shared/elements/Error/Error'
import { QuestionFormTitle } from './QFormTitle'

export const QuestionForm = () => {
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const { tagOptions, tagColorStyles } = TagStyle()
  const { processQuestion } = useProcessQuestion()
  const editedQuestion = useAppSelector(selectQuestion)
  const editMode = useAppSelector(selectEditMode)
  const dispatch = useAppDispatch()
  const { convertToTagType, multiValue, setMultiValue, displayTagsWhenUpdate } = useTag()
  const { formScreenRefresh, formScreenBrowserBack } = usePageTransition()
  const { data: dataUserIdAndUsername, isLoading, error } = useQueryUserIdAndUsername()

  useEffect(() => {
    // formの入力有無でブラウザバック及び画面リフレッシュの挙動を変える
    // 入力有: confirmを出して入力内容を破棄しても良いかを尋ねる
    // 入力無: そのままブラウザバック及び画面リフレッシュする
    if (editMode) {
      history.pushState(null, '', null)
      window.addEventListener('popstate', formScreenBrowserBack, false)
      window.addEventListener('beforeunload', formScreenRefresh, false)
    }
    return () => {
      window.removeEventListener('beforeunload', formScreenRefresh, false)
      window.removeEventListener('popstate', formScreenBrowserBack, false)
    }
  }, [editMode])

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <>
      {dataUserIdAndUsername && (
        <form onSubmit={processQuestion} className='flex w-full flex-col items-center justify-center gap-2'>
          <div className=' flex w-full'>
            <QuestionFormTitle editedTitle={editedQuestion.title} />
          </div>
          <div className=' flex w-8/12 flex-col items-center justify-center gap-5 rounded-xl bg-white py-3'>
            <Select
              name='Tags'
              className=' w-11/12'
              isOptionDisabled={() => multiValue?.length! >= 5}
              onChange={(val) => {
                setMultiValue(val)
                dispatch(toggleEditMode(true))
              }}
              closeMenuOnSelect={false}
              options={tagOptions}
              styles={tagColorStyles}
              isMulti
              isSearchable
              isClearable
              placeholder='タグを5つまで選択できます'
              noOptionsMessage={() => '一致するタグがありません'}
              defaultValue={editedQuestion.id === '' ? multiValue : displayTagsWhenUpdate(editedQuestion.tags)}
            />
            <MDEditor
              className=' w-11/12'
              value={editedQuestion.body}
              onChange={(e) => {
                dispatch(setEditedQuestion({ ...editedQuestion, body: e! }))
                dispatch(toggleEditMode(true))
              }}
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
                      post_username: dataUserIdAndUsername.username,
                      tags: convertToTagType(multiValue),
                    })
                  )
                }}
                className=' btn-info btn text-white hover:opacity-75'
                // disabled={!isEdited}
              >
                {editedQuestion.id === '' ? '送信する' : '更新する'}
              </SubmitBtn>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
