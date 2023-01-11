import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQueryUserQuestion } from '../../../lib/reactQuery/useQuery/useQueryUserQuestion'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { selectMenubarTab, changeMenubarTab } from '../../../store/slices/menuBarSlice'
import { QuestionItem } from '../../QList/QItem'
import { MyPageBase } from '../../shared/layout/MyPageBase'

export const MyPageQuestion = () => {
  const location = useLocation()
  const userIdAndUsername = location.state
  const { data: dataUserQuestions } = useQueryUserQuestion(userIdAndUsername.username)
  const dispatch = useAppDispatch()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  useEffect(() => {
    // 画面更新したい際にナビゲーションタブが初期化されるので、dispatchで上書きする
    dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'myPage', myPageMenu: 'myQuestion' }))
  }, [])

  return (
    <MyPageBase userIdAndUsername={userIdAndUsername}>
      <div className=' grid w-11/12 grid-cols-1 gap-5 py-10 md:w-10/12 md:grid-cols-2 xl:grid-cols-3'>
        {dataUserQuestions?.length! >= 1 ? (
          dataUserQuestions?.map((question) => (
            <QuestionItem
              path={`/${question.post_username}/question/${question.id}`}
              key={question.id}
              id={question.id}
              title={question.title}
              body={question.body}
              post_username={question.post_username}
              answer_list={question.answer_list}
              tags={question.tags}
              isDashboard
            />
          ))
        ) : (
          <p>まだ質問はありません</p>
        )}
      </div>
    </MyPageBase>
  )
}
