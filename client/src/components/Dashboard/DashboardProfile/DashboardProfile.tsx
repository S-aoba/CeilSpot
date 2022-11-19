import defaultUserIcon from '../../../assets/defaultUserIcon.png'

export const DashboardProfile = () => {
  return (
    <div className=' mt-5 grid h-96 w-7/12 grid-cols-12 rounded-3xl bg-white'>
      <div className=' col-span-3 flex items-center justify-center'>
        <img src={defaultUserIcon} alt='userIcon' className=' h-32 w-32 rounded-full' />
      </div>
      <div className=' col-span-9 ml-10 flex flex-col justify-center gap-10 pr-5'>
        <div>
          <p className=' text-2xl'>userName: username</p>
        </div>
        <div>
          <p>
            自己紹介文: Age: 29 / language: TypeScript(React), Java, Python / 目標: バックエンドエンジニアに転職 /
            2022年7月〜 チーム開発参加
          </p>
        </div>
        <div className=' flex'>
          <span>Twitter: -------</span>
          <span>GitHub: --------</span>
          <span>Website: -------</span>
        </div>
      </div>
    </div>
  )
}
