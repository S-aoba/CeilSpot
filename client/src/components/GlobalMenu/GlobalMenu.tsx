import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useQueryUserIdAndUsername } from '../../functional/UseQuery/useQueryUserIdAndUsername'
import { QuestionList } from '../../pages/QList'
import { changeMenubarTab, selectMenubarTab } from '../../slices/menuBarSlice'
import { Loading } from '../shared/elements/Loading/Loading'
import { useGlobalMenuTabStyle } from './useGlobalMenuTabStyle'

export const GlobalMenu = () => {
  const dispatch = useAppDispatch()
  const { data: userIdAndUsername, isLoading, error } = useQueryUserIdAndUsername()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)
  const { questionsStyle, eventStyle, informationStyle, myPageStyle } = useGlobalMenuTabStyle()

  if (error) return <QuestionList />
  if (isLoading) return <Loading />
  return (
    <div className=' flex justify-center bg-sky-100 py-4'>
      <div className=' lg:container lg:mx-auto w-10/12'>
        <ul className=' flex list-none gap-x-5 font-mono text-sm tracking-wide text-stone-500 opacity-50'>
          <li className={questionsStyle}>
            <Link
              to={'/'}
              onClick={() => {
                dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'questions' }))
              }}
            >
              質問
            </Link>
          </li>
          <li>
            <Link
              to={'#'}
              className={eventStyle}
              onClick={() => {
                dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'event' }))
              }}
            >
              イベント
            </Link>
          </li>
          <li>
            <Link
              to={'#'}
              className={informationStyle}
              onClick={() => {
                dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'information' }))
              }}
            >
              お知らせ
            </Link>
          </li>
          {userIdAndUsername && (
            <li className={myPageStyle}>
              <Link
                to={'/myPage/question'}
                relative='path'
                state={userIdAndUsername.userId}
                onClick={() => {
                  dispatch(changeMenubarTab({ ...currentMenuBarTabType, globalMenu: 'myPage' }))
                }}
              >
                <p>マイページ</p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
