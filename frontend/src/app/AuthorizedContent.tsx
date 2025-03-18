import { Button, Typography } from "@mui/material";
import { useAuth } from "./utils/useAuth.js";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const AuthorizedContent = () => {
  const [backendData, setBackendData] = useState('')

  const { isAuth, setIsAuth } = useAuth()

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsAuth(false)
  }

  const getBackendData = () => {
    axios({
      url: '/api/getSomething',
      method: 'GET',
      headers: {
        'Authorization': `${localStorage.getItem('authToken')}`
      }
    }).then(res => {
      setBackendData(res.data)
    }).catch(e => {
      console.log('error: ', e)
    })
  }

  return (
    isAuth ?
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
        <div>
          <Button style={{ height: '200px', width: '400px' }} onClick={getBackendData}>Click me!</Button>
          <Typography>JWT expires after 1 minute.</Typography>
          <Typography>{backendData}</Typography>
        </div>
        <Button onClick={logout}>Logout</Button>
      </div> :
      <Navigate to='/login' />
  )
}