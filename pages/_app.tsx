import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { customTheme, lightTheme,  darkTheme } from '../themes';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

interface Props extends AppProps {
    theme: string
}

function MyApp({ Component, pageProps, theme='dark' }: Props) {

  const [currentTheme, setcurrentTheme] = useState(darkTheme)


  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'dark'
     cookieTheme === 'custom' ? setcurrentTheme(customTheme) :
     cookieTheme === 'light' ?  setcurrentTheme(lightTheme) :  setcurrentTheme(darkTheme)  
  }, [currentTheme])
  

 

  return (
    <ThemeProvider theme={
      currentTheme
    }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// MyApp.getInitialProps = async (AppCtx: AppContext) => {
 
//   console.log(AppCtx)
//   const cookies = AppCtx.ctx.req ? (AppCtx.ctx.req as any).cookies : {theme: 'dark'}

//  const validThemes = ['light', 'dark', 'custom']
 
//   return {
//     theme: validThemes.includes(cookies.theme)? cookies.theme :  'dark'
//   }
// }


export default MyApp
