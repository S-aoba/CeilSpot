import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useQueryUserIdAndUsername } from '../../functional/UseQuery/useQueryUserIdAndUsername'
import { QuestionList } from '../../pages/QList'
import { changeMenubarTab, selectMenubarTab } from '../../slices/menuBarSlice'
import { Loading } from '../shared/elements/Loading/Loading'

export const GlobalMenu = () => {
  const dispatch = useAppDispatch()
  const { data: userIdAndUsername, isLoading, error } = useQueryUserIdAndUsername()
  const currentMenuBarTabType = useAppSelector(selectMenubarTab)

  if (error) return <QuestionList />
  if (isLoading) return <Loading />
  return (
    <div className=' flex justify-center bg-sky-100 py-2'>
      <div className=' container mx-auto'>
        <ul className=' flex list-none gap-x-5 font-mono text-sm tracking-wide text-stone-500 opacity-50	'>
          <li className=' border-b-2 border-zinc-900 px-2 pb-1'>質問</li>
          <li>イベント</li>
          <li>お知らせ</li>
          {userIdAndUsername && (
            <li className=' hover:text-black'>
              <Link
                to={'/dashboard/question'}
                relative='path'
                state={userIdAndUsername.userId}
                onClick={() => dispatch(changeMenubarTab({ ...currentMenuBarTabType, myPageMenu: 'myQuestion' }))}
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
