// "use client"

// import React, { useState } from "react"

// import CallMethodGet from "./Lab3/CallMethodGet"
// export default function Home(){

//   return (<div >
//     <div>Lab3</div>
//     <CallMethodGet />
//   </div>)

// }


"use client"

import React, { useState } from "react"

export default function Home(){
  const [userName, setUserName] = useState("")
  const [passWord, setPassWord] = useState("")

  const onRegister = async () => {
    const res = await fetch('http://localhost:8080/user-profile/save', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({'userName':userName, 'passWord':passWord})
    })
    const resData = await res.json()
    console.log(resData)
  }
  
  return (<div >
    <div>Register</div>
    <div>
      <input type="text" onChange={(e) => setUserName(e.target.value)}/>
      <input type="text" onChange={(e) => setPassWord(e.target.value)}/>
      <button onClick={onRegister}>Register</button>
    </div>
  </div>)
}