import { ChangeEventHandler, ComponentPropsWithRef } from 'react'

type Props = {
  value: string | number
  onChange: ChangeEventHandler
} & Omit<ComponentPropsWithRef<'input'>, 'value' | 'onChange'>

export const Input: React.FC<Props> = ({ value, onChange, ...props }) => {
  return <input {...props} value={value} onChange={onChange} />
}
