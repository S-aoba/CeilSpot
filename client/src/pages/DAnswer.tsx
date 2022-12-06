import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useQueryUserAnswer } from '../functional/UseQuery/useQueryUserAnswer'
import { UserInfo } from '../types/types'
import { Error } from '../components/shared/elements/Error/Error'
import { Loading } from '../components/shared/elements/Loading/Loading'
import { QuestionItem } from '../components/QList/QItem'
import { changeMenubarTab, selectMenubarTab } from '../slices/menuBarSlice'

export const DashboardAnswer = () => {
  const dispatch = useAppDispatch()
  const { username } = useOutletContext<UserInfo>()
  const { data: dataUserAnswers, isLoading: isUserAnswerLoading, error } = useQueryUserAnswer(username)
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  useEffect(() => {
    // 画面更新したい際にナビゲーションタブが初期化されるので、dispatchで上書きする
    dispatch(changeMenubarTab({ ...currentMenuBarTabType, myPageMenu: 'myAnswer' }))
  }, [])

  if (error) return <Error />
  if (isUserAnswerLoading) return <Loading />

  return (
    <div className='flex flex-wrap justify-center lg:justify-between gap-5 px-28 py-10'>
      {dataUserAnswers?.length! >= 1 ? (
        dataUserAnswers?.map((question) => (
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
        <p>まだ回答はありません</p>
      )}
    </div>
  )
}
