import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import { ReactNode } from 'react'

export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI prompts'
}
interface Props {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <body>
        <Provider session={''}>
          <>
            <div className='main'>
              <div className="gradient" />
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout