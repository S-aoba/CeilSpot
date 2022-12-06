import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useQueryUserAnswer } from '../functional/UseQuery/useQueryUserAnswer'
import { UserInfo } from '../types/types'
import { Error } from '../components/shared/elements/Error/Error'
import { Loading } from '../components/shared/elements/Loading/Loading'
import { changeMenubarTab, selectMenubarTab } from '../slices/menuBarSlice'
import { DashBoardAnswerItem } from '../components/Dashboard/DAnswer/DAnswerItem'

export const DashboardAnswer = () => {
  const dispatch = useAppDispatch()
  const { username } = useOutletContext<UserInfo>()
  const { data: dataUserAnswers, isLoading: isUserAnswerLoading, error } = useQueryUserAnswer(username)
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  useEffect(() => {
    // 画面更新したい際にナビゲーションタブが初期化されるので、dispatchで上書きする
    dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'myPage', myPageMenu: 'myAnswer' }))
  }, [])

  if (error) return <Error />
  if (isUserAnswerLoading) return <Loading />

  return (
    <div className='flex flex-wrap justify-center gap-5 px-28 py-10 lg:justify-between'>
      {dataUserAnswers?.length! >= 1 ? (
        dataUserAnswers?.map((answer) => (
          <DashBoardAnswerItem
            key={answer.id}
            id={answer.id}
            body={answer.body}
            question_id={answer.question_id}
            respondent_username={answer.respondent_username}
          />
        ))
      ) : (
        <p>まだ回答はありません</p>
      )}
    </div>
  )
}
