import React from 'react'
import { QuestionType } from '../../types/types'
import { DetailMenu } from './DetailMenu'
import { DetailBody } from './DetailBody'

export const DetailCard: React.FC<QuestionType & { isDashboard: boolean }> = ({
  id,
  title,
  body,
  post_username,
  answer_list,
  tags,
  isDashboard,
}) => {
  return (
    <div className='flex justify-center xl:col-span-9'>
      <div className=' flex h-fit w-6/12 flex-col items-center rounded-xl bg-white py-5 md:w-11/12 xl:w-full'>
        {isDashboard && (
          <DetailMenu
            id={id}
            title={title}
            body={body}
            post_username={post_username}
            answer_list={answer_list}
            tags={tags}
          />
        )}
        <DetailBody body={body} />
      </div>
    </div>
  )
}
