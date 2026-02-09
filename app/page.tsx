'use client'

import { useRouter } from 'next/router'
import {useState} from 'react'

export default function page(){
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")
  const [err,setErr] =useState("")
  const router = useRouter()

const login = async()=>{
  const res = await fetch('/api/login', {
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({username,password})
  })
if(res.ok){
  router.push('/home')
}else{
  alert('ไม่ถูก ต้อง?')
}

}

  return()
}