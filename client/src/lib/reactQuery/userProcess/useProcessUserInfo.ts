import { FormEvent } from 'react'
import { useAppSelector } from '../../../store/app/hooks'
import { selectUserInfo } from '../../../store/slices/userInfoSlice'
import { useMutateUserInfo } from '../useMutate/useMutateUserInfo'

export const useProcessUserInfo = () => {
  const editedUserInfo = useAppSelector(selectUserInfo)
  const { updateUserInfoMutation } = useMutateUserInfo()
  const processUserInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUserInfoMutation.mutate(editedUserInfo)
  }
  return { processUserInfo }
}
