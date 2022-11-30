import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { useQueryUserAnswer } from '../functional/UseQuery/useQueryUserAnswer'
import { changeMenubarTab } from '../slices/appSlice'
import { UserInfo } from '../types/types'
import { Error } from '../components/shared/elements/Error/Error'
import { Loading } from '../components/shared/elements/Loading/Loading'
import { DashBoardAnswerCard } from '../components/Dashboard/DAnswer/DAnswerCard'

export const DashboardAnswer = () => {
  const dispatch = useAppDispatch()
  const { username } = useOutletContext<UserInfo>()
  const { data: dataUserAnswers, isLoading: isUserAnswerLoading, error } = useQueryUserAnswer(username)

  useEffect(() => {
    // 画面更新したい際にナビゲーションタブが初期化されるので、dispatchで上書きする
    dispatch(changeMenubarTab('answer'))
  }, [])

  if (error) return <Error />
  if (isUserAnswerLoading) return <Loading />

  return (
    <div className=' col-span-9 animate-fade-in-fwd'>
      <div className='grid w-10/12 grid-cols-1 gap-y-5'>
        {dataUserAnswers?.length! >= 1 ? (
          dataUserAnswers?.map((answer) => (
            <DashBoardAnswerCard
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
    </div>
  )
}
