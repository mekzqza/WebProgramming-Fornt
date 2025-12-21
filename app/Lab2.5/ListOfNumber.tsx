'use client';
import { useState } from "react";
export default function ListOfNumber() {
    const [lst,setLst] = useState<number[]>([21,34,5]);
    const [input,setInput] = useState<string>('');
    const add = () => {
        const num =Number(input);
        if(isNaN(num))return;
        setLst([...lst,num]);
        setInput('');
    }
    const sum =lst.reduce((a,b) => a + b,0);

return(
    <div>
        {lst.map((item,index) => (
            <div key={index}>{item}</div>
        ))}
        <div>Sum: {sum}</div>
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
        <button onClick={add}>Add</button>
    </div>
);
}