'use client';
import { useState } from "react";

export default function AddAndDel(){

  const [number,setNumber] = useState(0);

  return(
    <div>
    {number}
    <button onClick={()=> setNumber(number+1)}>add</button>
    <button onClick={()=> setNumber(number-1)}>Del</button>
    </div>
  );

}