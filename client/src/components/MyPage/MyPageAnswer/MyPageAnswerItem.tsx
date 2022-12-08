import DefaultUserIcon from '../../../assets/defaultUserIcon.png'
import { Link } from 'react-router-dom'
import { useQuerySingleQuestion } from '../../../functional/UseQuery/useQuerySingleQuestion'
import { AnswerType } from '../../../types/types'
import { QItemLanguageIcon } from '../../QList/QItemLanguageIcon'
import { Error } from '../../shared/elements/Error/Error'
import { Loading } from '../../shared/elements/Loading/Loading'

export const MyPageAnswerItem: React.FC<AnswerType> = ({ id, body, question_id, respondent_username }) => {
  const { data: dataQuestion, isLoading: isDataQuestionLoading, error } = useQuerySingleQuestion(question_id)
  if (error) return <Error />
  if (isDataQuestionLoading) return <Loading />

  return (
    <>
      {dataQuestion && (
        <div className=' flex h-24 w-[26rem] rounded-3xl border-[3px] bg-white duration-500 hover:relative hover:translate-x-2 hover:-translate-y-2 hover:shadow-[-8px_8px_0px_0px_#171717] lg:w-[29rem]'>
          <QItemLanguageIcon firstTag={dataQuestion.tags[0]} />
          <div className=' grid w-full grid-rows-6 py-2 px-2'>
            <div className=' row-span-4 flex items-center'>
              <Link
                to={`/${dataQuestion.post_username}/question/${dataQuestion.id}`}
                state={{
                  id: dataQuestion.id,
                  isDashboard: true,
                }}
              >
                <p className=' text-lg font-semibold line-clamp-2 hover:text-sky-400'>{body}</p>
              </Link>
            </div>
            <div className=' row-span-2 flex items-center justify-start gap-4'>
              <img src={DefaultUserIcon} alt='userIcon' className=' h-8 w-8 rounded-full' />
              <p className=' truncate text-sm'>{respondent_username}</p>
              <p className=' text-sm text-gray-400'>29日前</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
