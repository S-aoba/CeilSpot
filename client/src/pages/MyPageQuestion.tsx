import { useOutletContext } from 'react-router-dom'
import { useQueryUserQuestion } from '../functional/UseQuery/useQueryUserQuestion'
import { UserInfo } from '../types/types'
import { Error } from '../components/shared/elements/Error/Error'
import { Loading } from '../components/shared/elements/Loading/Loading'
import { QuestionItem } from '../components/QList/QItem'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { changeMenubarTab, selectMenubarTab } from '../slices/menuBarSlice'

export const MyPageQuestion = () => {
  const { username } = useOutletContext<UserInfo>()
  const { data: dataUserQuestions, isLoading: isUserQuestionsLoading, error } = useQueryUserQuestion(username)
  const dispatch = useAppDispatch()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  useEffect(() => {
    // 画面更新したい際にナビゲーションタブが初期化されるので、dispatchで上書きする
    dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'myPage', myPageMenu: 'myQuestion' }))
  }, [])
  console.log(currentMenuBarTabType)

  if (error) return <Error />
  if (isUserQuestionsLoading) return <Loading />

  return (
    <div className=' grid grid-cols-1 gap-5 py-10 lg:grid-cols-2'>
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
  )
}
