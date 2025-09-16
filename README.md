# Jira Clone

##  Use Stack

- npx create-next-app@latest
- npx shadcn@latest init
- npx shadcn@latest add --all
- npm i react-icons
- npm i hono@latest
- npm i @tanstack/react-query@latest
- npm i @hono/zod-validator
- npm i node-appwrite@latest
- npm i server-only
- npm install @radix-ui/react-visually-hidden(개인적으로 추가한 sheet title 부분 에러 해결 방법)
- npm i react-use
- npm i nuqs
- npm i date-fns
- npm i @hello-pangea/dnd
- npm i react-big-calendar
- npm i -D @types/react-big-calendar

## 수정해야할 점
- appwrite는 Image transformations를 free tier에서 제공하지 않음.
따라서 getFilePreview를 사용할 수 없음
+ 우회방법으로 base64프리뷰를 사용하지 않고, 이미지 자체를 가져옴.
+ storage 설정에서 Permissons에 Read Any 설정함.
- "nuqs": "^2.5.0"를 사용하는데, 이 버전은 app/layout.tsx에 NuqsAdapter컴포넌틑를 넣어야한다.