import { useState } from 'react'
import { MultiValue } from 'react-select'
import { useAppSelector } from '../../../app/hooks'
import { selectQuestion } from '../../../slices/questionSlice'

export const useTag = () => {
  const editedQuestion = useAppSelector(selectQuestion)
  const [multiValue, setMultiValue] = useState<
    MultiValue<{
      value: string
      label: string
      color: string
    }>
  >(
    editedQuestion.tags.length > 0
      ? [{ value: editedQuestion.tags[0], label: editedQuestion.tags[0], color: '#e0f2fe' }]
      : []
  )

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

  const displayTagsWhenUpdate = (tags: string[]) => {
    const displayTagList = []
    for (let i: number = 0; i < tags.length; i++) {
      if (tags[i] === 'undefined') break
      displayTagList.push({ value: tags[i], label: tags[i], color: '#e0f2fe' })
    }
    return displayTagList
  }
  return { convertToTagType, multiValue, setMultiValue, displayTagsWhenUpdate }
}
