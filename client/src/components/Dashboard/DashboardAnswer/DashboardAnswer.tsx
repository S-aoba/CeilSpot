import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { useQueryUserAnswer } from '../../../functional/UseQuery/useQueryUserAnswer'
import { changeMenubarTab } from '../../../slices/appSlice'
import { UserInfo } from '../../../types/types'
import { Error } from '../../Error/Error'
import { Loading } from '../../Loading/Loading'
import { Base } from '../../shared/layout/Base'
import { DashBoardAnswerCard } from './DashBoardAnswerCard'

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
    <Base id='userAnswer'>
      <div className='grid w-11/12 grid-cols-1 gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-10 xl:w-10/12'>
        {dataUserAnswers &&
          dataUserAnswers?.map((answer) => (
            <DashBoardAnswerCard
              key={answer.id}
              id={answer.id}
              body={answer.body}
              question_id={answer.question_id}
              respondent_username={answer.respondent_username}
            />
          ))}
      </div>
    </Base>
  )
}
