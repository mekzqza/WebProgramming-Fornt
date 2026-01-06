'use client';

import { useState } from "react";

export default function CallMethodPost(){
  const [name,SetName]=useState("");
  const [address,SetAddress]=useState("");

    async function submitData(){
    const res = await fetch('https://weblab.localapp.cc/store',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name,address})});
     
      SetName('');
      SetAddress('');
  }

  return(
    <div>
      <input type="text" value={name} onChange={e => SetName(e.target.value)} />
      <input type="text" value={address} onChange={e => SetAddress(e.target.value)} />
      <button onClick={submitData}>Submit</button>
      </div>
  );
}