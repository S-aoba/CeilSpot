type Props = {
  self_introduction: string
}

export const SelfIntroduction: React.FC<Props> = ({ self_introduction }) => {
  return (
    <div>
      <div className='mb-2'>
        <p>自己紹介</p>
      </div>
      <textarea
        className=' h-44 w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
        placeholder='自己紹介を入力してください'
        value={self_introduction ? self_introduction : ''}></textarea>
    </div>
  )
}
