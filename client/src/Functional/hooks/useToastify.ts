import { toast } from 'react-toastify'

export const useToastify = () => {
  const toastInfo = (message: string) => {
    toast.info(`${message}`, {
      autoClose: 2000,
      closeOnClick: true,
    })
  }
  return { toastInfo }
}
