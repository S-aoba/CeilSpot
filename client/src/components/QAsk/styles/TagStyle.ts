import { StylesConfig, GroupBase, OptionsOrGroups } from 'react-select'

export const TagStyle = () => {
  const tagOptions:
    | OptionsOrGroups<
        {
          value: string
          label: string
          color: string
        },
        GroupBase<{
          value: string
          label: string
          color: string
        }>
      >
    | undefined = [
    { value: 'Python', label: 'Python', color: '#e0f2fe' },
    { value: 'TypeScript', label: 'TypeScript', color: '#e0f2fe' },
    { value: 'Javascript', label: 'Javascript', color: '#e0f2fe' },
    { value: 'React', label: 'React', color: '#e0f2fe' },
    { value: 'Java', label: 'Java', color: '#e0f2fe' },
    { value: 'C', label: 'C', color: '#e0f2fe' },
    { value: 'C++', label: 'C++', color: '#e0f2fe' },
    { value: 'PHP', label: 'PHP', color: '#e0f2fe' },
    { value: 'Ruby', label: 'Ruby', color: '#e0f2fe' },
    { value: 'Perl', label: 'Perl', color: '#e0f2fe' },
    { value: 'Go', label: 'Go', color: '#e0f2fe' },
    { value: 'Swift', label: 'Swift', color: '#e0f2fe' },
    { value: 'Kotlin', label: 'Kotlin', color: '#e0f2fe' },
    { value: 'Rust', label: 'Rust', color: '#e0f2fe' },
  ]

  const tagColorStyles:
    | StylesConfig<
        {
          value: string
          label: string
          color: string
        },
        true,
        GroupBase<{
          value: string
          label: string
          color: string
        }>
      >
    | undefined = {
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
      }
    },
    multiValueLabel: (styles) => {
      return {
        ...styles,
        color: '#2563eb',
      }
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: '#2563eb',
        cursor: 'pointer',
        ':hover': {
          color: '#fff',
        },
      }
    },
  }
  return { tagOptions, tagColorStyles }
}
