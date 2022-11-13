import { ChangeEvent, useState } from 'react'
import { Button } from '../../shared/elements/Button'
import { Input as SearchBar } from '../../shared/elements/Input'
import DefaultUserIcon from '../../../assets/defaultUserIcon.png'

export const HeaderLight = () => {
  const [searchValue, setSearchValue] = useState('')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)
  return (
    <div className=' md:col-span-10 col-span-9 flex items-center justify-start gap-3'>
      <SearchBar
        className=' w-8/12 rounded-3xl border py-3 pl-3 outline-sky-400'
        placeholder='Search...'
        value={searchValue}
        onChange={onChangeHandler}
      />
      <Button>
        <img src={DefaultUserIcon} alt='userIcon' className=' h-12 w-12 rounded-full' />
      </Button>
      <Button className=' btn-info btn text-white hover:opacity-75'>質問する</Button>
    </div>
  )
}
