import { ChangeEvent, useState } from 'react'

export const useHeaderLight = () => {
  const [searchValue, setSearchValue] = useState('')
  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)
  return { onChangeSearchValue, searchValue }
}
