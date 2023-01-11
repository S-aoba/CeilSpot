import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQueryUserAnswer } from '../../../lib/reactQuery/useQuery/useQueryUserAnswer'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { selectMenubarTab, changeMenubarTab } from '../../../store/slices/menuBarSlice'
import { MyPageAnswerItem } from '../../MyPage/MyPageAnswer/MyPageAnswerItem'
import { MyPageBase } from '../../shared/layout/MyPageBase'

export const MyPageAnswer = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const userIdAndUsername = location.state
  const { data: dataUserAnswers } = useQueryUserAnswer(userIdAndUsername.username)
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  useEffect(() => {
    // 画面更新したい際にナビゲーションタブが初期化されるので、dispatchで上書きする
    dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'myPage', myPageMenu: 'myAnswer' }))
  }, [])

  return (
    <MyPageBase userIdAndUsername={userIdAndUsername}>
      <div className='grid grid-cols-1 gap-5 py-10 lg:grid-cols-2'>
        {dataUserAnswers?.length! >= 1 ? (
          dataUserAnswers?.map((answer) => (
            <MyPageAnswerItem
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
    </MyPageBase>
  )
}
