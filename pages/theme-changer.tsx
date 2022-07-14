import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Layout } from '../components/layouts'
import Cookies from "js-cookie";
import axios from 'axios';
import { GetServerSideProps } from 'next';

type Props = {
    theme: string
}

const ThemeChangerPage:FC<Props> = ({theme}) => {
  const [currentThemme, setcurrentThemme] = useState(theme)

  const onThemeChange = (e:ChangeEvent<HTMLInputElement>) => {
    setcurrentThemme(e.target.value)
   // localStorage.setItem('theme', e.target.value)
    Cookies.set('theme', e.target.value)
  }

  useEffect(() => {
    console.log(localStorage.getItem('theme'))
    console.log(Cookies.get('theme'))
  
    return () => {
      
    }
  }, [])


  const onClick = async() => {
        const resp = await axios.get('/api/hello')
        const {data} = resp
        console.log(data)
  }
  

  return (
    <Layout>
        <Card>
            <CardContent>
                <FormControl>
                    <FormLabel>
                        Tema
                    </FormLabel>
                    <RadioGroup
                        value={currentThemme}
                        onChange={(e) => onThemeChange(e)}
                    >
                        <FormControlLabel value={'light'} control={<Radio />} label={'light'} />
                        <FormControlLabel value={'dark'} control={<Radio />} label={'dark'} />
                        <FormControlLabel value={'custom'} control={<Radio />} label={'custom'} />
                    </RadioGroup>
                </FormControl>
                <Button onClick={onClick}> 
                    Solicitud    
                </Button>
            </CardContent>
        </Card>
    </Layout>
    
  )
}

 // You should use getServerSideProps when:
 // - Only if you need to pre-render a page whose data must be fetched at request time

 
 export const getServerSideProps: GetServerSideProps = async (ctx) => {
   
    const { req: { cookies : { theme = 'dark'}} } = ctx

    const validThemes = ['light', 'dark', 'custom']

    return {
        props: {
            theme: validThemes.includes(theme)? theme : 'dark'
        }
    }
 }

export default ThemeChangerPage