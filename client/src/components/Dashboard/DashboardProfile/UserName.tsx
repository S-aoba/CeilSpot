type Props = {
  username: string
}

export const UserName: React.FC<Props> = ({ username }) => {
  return (
    <div>
      <div className=' mb-2'>
        <p>ユーザー名</p>
      </div>
      <input
        type='text'
        className=' w-full rounded-lg border border-gray-300 bg-gray-100 py-2 px-3 outline-sky-400'
        value={`${username}`}
      />
    </div>
  )
}
