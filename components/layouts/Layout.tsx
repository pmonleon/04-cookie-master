import Head from 'next/head'
import React, { FC, ReactNode } from 'react'
import { Navbar } from '../ui';

type Props = {
    children: ReactNode;
}

export const Layout:FC<Props> = ({children}) => {
  return (
    <>
        <Head>

        </Head>
        <nav>
            {/* Navbar */}
            <Navbar />
        </nav>
        <main style={{padding: '20px 50px'}}>
            {children}
        </main>
    </>
  )
}
