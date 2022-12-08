type AnswerCountResponseProps = {
  answer_list: string[]
}

export const AnswerCountResponse: React.FC<AnswerCountResponseProps> = ({ answer_list }) => {
  return (
    <>
      {answer_list.length > 0 ? (
        <div className=' mb-8 font-mono text-3xl tracking-widest'>
          <p>
            <span className=' text-sky-400'>{answer_list.length}</span>
            件の回答
          </p>
        </div>
      ) : (
        <div className=' mb-8 font-mono text-xl tracking-widest'>
          <p>まだ回答はありません</p>
        </div>
      )}
    </>
  )
}
