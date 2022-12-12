import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import Select from 'react-select'
import { Button as SubmitBtn } from '../shared/elements/Button'
import { TagStyle } from './styles/TagStyle'
import { useQueryUserIdAndUsername } from '../../functional/UseQuery/useQueryUserIdAndUsername'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useTag } from './hooks/useTag'
import { useScreen } from '../../functional/hooks/useScreen'
import { Loading } from '../shared/elements/Loading/Loading'
import { Error } from '../shared/elements/Error/Error'
import { QuestionFormTitle } from './QFormTitle'
import { useProcessQuestion } from '../../functional/hooks/UserProcess/useProcessQuestion'
import { selectQuestion, setEditedQuestion } from '../../slices/questionSlice'
import { MarkdownEditor } from './MarkdownEditor'

export const QuestionForm = () => {
  const { tagOptions, tagColorStyles } = TagStyle()
  const { processQuestion } = useProcessQuestion()
  const editedQuestion = useAppSelector(selectQuestion)
  const dispatch = useAppDispatch()
  const { convertToTagType, multiValue, setMultiValue, displayTagsWhenUpdate } = useTag()
  const { formScreenRefresh, formScreenBrowserBack } = useScreen()
  const { data: dataUserIdAndUsername, isLoading, error } = useQueryUserIdAndUsername()

  // useEffect(() => {
  //   // formの入力有無でブラウザバック及び画面リフレッシュの挙動を変える
  //   // 入力有: confirmを出して入力内容を破棄しても良いかを尋ねる
  //   // 入力無: そのままブラウザバック及び画面リフレッシュする
  //   if (editMode) {
  //     history.pushState(null, '', null)
  //     window.addEventListener('popstate', formScreenBrowserBack, false)
  //     window.addEventListener('beforeunload', formScreenRefresh, false)
  //   }
  //   return () => {
  //     window.removeEventListener('beforeunload', formScreenRefresh, false)
  //     window.removeEventListener('popstate', formScreenBrowserBack, false)
  //   }
  // }, [editMode])

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <>
      {dataUserIdAndUsername && (
        <form onSubmit={processQuestion} className='mt-5 flex w-full flex-col items-center justify-center'>
          <div className=' flex w-full'>
            <QuestionFormTitle editedTitle={editedQuestion.title} />
          </div>
          <div className=' flex w-full flex-col items-start justify-center'>
            <Select
              name='Tags'
              className=' my-5 w-full'
              isOptionDisabled={() => multiValue?.length! >= 5}
              onChange={(val) => {
                setMultiValue(val)
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
            <div className=' grid w-full grid-cols-2 rounded-t-lg text-center text-base outline outline-1 outline-gray-700'>
              <p className=' col-span-1 inline-block rounded-tl-lg border-r border-gray-400 bg-gray-700 py-2 text-white'>
                本文
              </p>
              <p className=' col-span-1 inline-block rounded-tr-lg border-l border-gray-400 bg-gray-700 py-2 text-white'>
                プレビュー
              </p>
            </div>
            {/* <MDEditor
              className=' w-full rounded-none rounded-b-lg'
              value={editedQuestion.body}
              onChange={(e) => {
                dispatch(setEditedQuestion({ ...editedQuestion, body: e! }))
              }}
              height={500}
              hideToolbar
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            /> */}
            <MarkdownEditor />
            <div className=' my-5 flex w-11/12 flex-col items-center justify-center gap-3 lg:flex lg:flex-row lg:justify-start'>
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
                disabled={false}
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
