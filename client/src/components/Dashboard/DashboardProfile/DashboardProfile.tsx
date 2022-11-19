import defaultUserIcon from '../../../assets/defaultUserIcon.png'
import { useQueryUser } from '../../shared/hooks/UseQuery/useQueryUser'
import { UserName } from './UserName'
import { SelfIntroduction } from './SelfIntroduction'
import { Twitter } from './Twitter'
import { GitHub } from './GitHub'
import { WebSite } from './WebSite'

export const DashboardProfile = () => {
  const { data: dataUser } = useQueryUser()

  return (
    <form className=' mt-5 grid h-fit max-h-fit w-11/12 grid-cols-12 rounded-3xl bg-white py-5'>
      <div className=' col-span-3 flex items-center justify-center'>
        <img src={defaultUserIcon} alt='userIcon' className=' h-40 w-40 rounded-full' />
      </div>
      <div className=' col-span-9 ml-10 flex flex-col justify-center gap-8 pr-5 pl-10'>
        <UserName username={dataUser?.username!} />
        <SelfIntroduction self_introduction={dataUser?.self_introduction!} />
        <div className=' flex w-full flex-wrap gap-5'>
          <div className=' flex w-full justify-between gap-4'>
            <Twitter twitterURL={dataUser?.twitter!} />
            <GitHub githubURL={dataUser?.github!} />
          </div>
          <WebSite websiteURL={dataUser?.website!} />
        </div>
        <div>
          <button className=' btn-info btn text-white'>更新する</button>
        </div>
      </div>
    </form>
  )
}
