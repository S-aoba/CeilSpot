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
    <div className='my-8 flex justify-center'>
      <div className=' flex h-fit w-11/12 flex-col items-center rounded-xl bg-white py-5 lg:w-full'>
        <DetailMenu
          id={id}
          title={title}
          body={body}
          post_username={post_username}
          answer_list={answer_list}
          tags={tags}
          isDashboard={isDashboard}
        />
        <DetailBody body={body} />
      </div>
    </div>
  )
}
