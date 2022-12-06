export type QuestionType = {
  id: string
  title: string
  body: string
  post_username: string
  answer_list: string[]
  tags: string[]
}

export type AnswerType = {
  id: string
  body: string
  question_id: string
  respondent_username: string
}

export type UserIdAndUsernameType = {
  userId: string
  username: string
}

export type UserInfo = {
  id?: string
  username: string
  self_introduction?: string
  twitter?: string
  github?: string
  website?: string
}

export type User = {
  username: string
  email: string
  password: string
  self_introduction?: string
  twitter?: string
  github?: string
  website?: string
}

export type CsrfToken = {
  csrf_token: string
}

export type MenubarTabType = {
  globalMenu: 'questions' | 'event' | 'infomation' | 'myPage'
  myPageMenu: 'myQuestion' | 'myAnswer' | 'myProfile'
}
