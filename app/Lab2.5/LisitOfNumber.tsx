'use client';
import { useState } from "react";

export default function ListOfNumber(){
    const [lst,setLst] = useState<number[]>([21,34,5]);
    const [intvalue, setIntvalue] = useState<string>('');
    
    const add = () =>{
        const n =Number(intvalue);
        if(isNaN(n)) return;
        setLst([...lst,n]);
        setIntvalue('');
        
};
   const sum =lst.reduce((a,b) => a + b,0);

    return(
        <div>
            {lst.map((num,index) =>(
                <div key={index}>{num}</div>
            ))}
            <input type="text"
            value={intvalue}
            onChange={e => setIntvalue(e.target.value)}
            />
            <button onClick={add}>Add Number</button>
            <div>Sum: {sum}</div>
        </div>
    );

}


