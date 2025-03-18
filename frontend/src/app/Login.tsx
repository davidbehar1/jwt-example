import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './utils/useAuth.js'

export const Login = () => {
    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null);

    const { isAuth, setIsAuth } = useAuth();

    const onSubmit = () => {
        axios.post('/api/authenticate', { username, password }).then(res => {
            localStorage.setItem('authToken', res.data.token)
            setIsAuth(true)
        }).catch((e: any) => {
            console.log('error: ', e)
            setError(e)
        })
    }

    return (
        !isAuth ?
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
                <Typography>user credentials - username: root, password: 123</Typography>
                <TextField label='Username' onChange={text => { setUsername(text.target.value) }} />
                <TextField label='Password' onChange={text => { setPassword(text.target.value) }} />
                <Button onClick={onSubmit}>Submit</Button>
                <Typography color='red' visibility={error !== null ? 'visible' : 'hidden'}>{`There was an error: ${error}`}</Typography>
            </div> : <Navigate to='/' />
    )
}