import LanguageIcon from '../../assets/LanguageIcon/python.png'

export const QuestionDetail = () => {
  return (
    <div id='detail' className=' flex h-fit min-h-screen flex-col items-center py-20 md:container md:mx-auto'>
      <div className=' flex h-fit w-11/12 flex-col items-center justify-center gap-8 py-5'>
        <div>
          <img src={LanguageIcon} alt='languageIcon' className=' h-24 w-24 rounded-full' />
        </div>
        <div className=' flex w-full flex-col gap-3 py-5 text-center'>
          <p className=' text-2xl font-semibold'>
            JavaScriptによる緯度経度と地図のXY(平面直角座標)との変換、および地理学入門
          </p>
          <p className=' text-sm text-gray-400'>公開日: 2022/11/12</p>
        </div>
      </div>
      <div className=' flex w-11/12 flex-col items-center justify-center rounded-xl bg-white pb-10'>
        <div className=' flex w-11/12 gap-5 py-5'>
          <div className=' rounded-3xl border border-sky-400 py-3 px-3 text-sky-400'>
            <p># Python</p>
          </div>
          <div className=' rounded-3xl border border-sky-400 py-3 px-3 text-sky-400'>
            <p># Python</p>
          </div>
          <div className=' rounded-3xl border border-sky-400 py-3 px-3 text-sky-400'>
            <p># Python</p>
          </div>
          <div className=' rounded-3xl border border-sky-400 py-3 px-3 text-sky-400'>
            <p># Python</p>
          </div>
          <div className=' rounded-3xl border border-sky-400 py-3 px-3 text-sky-400'>
            <p># Python</p>
          </div>
        </div>

        <div className=' w-11/12'>
          <hr className='mb-6 border-gray-300' />

          <div>
            <p>
              緯度経度と地図上の平面直角座標(XY)とを変換するJavaScript関数を作成したのですが、そのプログラムの説明と、緯度経度と地図上の座標(XY)といった問題をを扱うのに最低限必要な「平面直角座標系」「世界測地系」「真北方向角」「XとYの向き」等の地理学の入門知識をまとめました。
            </p>
          </div>
          <hr className=' my-6 border-gray-300' />
        </div>
      </div>
    </div>
  )
}
