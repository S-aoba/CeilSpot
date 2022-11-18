# CeilSpot
## About
Programmingに特化したQ&Aサイト(ゆくゆくは機能をもう少し拡張してコミュニティサイトにしたい)
## Reason for creation
- 転職活動のPortfolioにするため
- CS(Computer Science)を学べるサービス、[Recursion](https://recursionist.io/)において、有料会員のみが使えるDiscordで質問するようになっているのだが、Discordがチャットベースであるため、
個人的に使いずらいと感じたので、作ろうと思いました。ですので基本的には、Recursionユーザーを想定で作っています。(あくまで勝手に想定してやっているので、Recursionとは一切関係ありません。)

## Technologies
- Client
  - React(vite) v18 + TypeScript
  - Tailwind CSS
  - Redux(Redux toolkit): 状態管理(Recoilに少し変更したい気分)
  - React Query: cache管理
  - React Router v6
  - React-md-editor
  - axios
- Server
  - FastAPI
- Database
  - mongoDB
