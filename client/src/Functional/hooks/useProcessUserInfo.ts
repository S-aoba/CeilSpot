import { FormEvent } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUserInfo } from '../../slices/appSlice'
import { useMutateUser } from './useMutateUser'

export const useProcessUserInfo = () => {
  const editedUserInfo = useAppSelector(selectUserInfo)
  const { updateUserInfoMutation } = useMutateUser()
  const processUserInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUserInfoMutation.mutate(editedUserInfo)
  }
  return { processUserInfo }
}
