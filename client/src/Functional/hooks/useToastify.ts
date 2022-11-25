import { toast } from 'react-toastify'

export const useToastify = () => {
  const toastInfo = (message: string) => {
    toast.info(`${message}`, {
      position: 'top-center',
      autoClose: 1000,
      closeOnClick: true,
    })
  }
  return { toastInfo }
}
