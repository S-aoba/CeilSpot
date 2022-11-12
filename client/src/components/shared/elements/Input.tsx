import { ReactNode, ComponentProps, ChangeEventHandler } from 'react'

type Props = {
  value: string | number
  onChange: ChangeEventHandler
} & Omit<ComponentProps<'input'>, 'value' | 'onChange'>

export const Input: React.FC<Props> = ({ value, onChange, ...props }) => {
  return <input {...props} value={value} onChange={onChange} />
}
