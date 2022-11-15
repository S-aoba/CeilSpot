import { useState } from 'react'
import { MultiValue } from 'react-select'

export const useTag = () => {
  const [multiValue, setMultiValue] = useState<
    MultiValue<{
      value: string
      label: string
      color: string
    }>
  >([])
  const convertToTagType = (
    tags: MultiValue<{
      value: string
      label: string
      color: string
    }>
  ): string[] => {
    let selectedTags = []
    for (let i: number = 0; i < tags.length; i++) {
      selectedTags.push(multiValue[i].value)
    }
    return selectedTags
  }
  return { convertToTagType, multiValue, setMultiValue }
}
