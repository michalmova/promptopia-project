'use client'

import { SessionProvider } from "next-auth/react"
import { ReactElement } from "react"

interface Props {
  children: ReactElement,
  session: any
}
const Provider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider